import jwt from 'jsonwebtoken'

import config from '../../../config'
import catchAsync from '../../../utils/catchAsync'
import { User } from '../models/'

const newToken = user => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    })
}

const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

const msg = 'Error en controlador signup'
const signup = catchAsync(msg, async (req, res) => {
    console.log('body', req.body)
    const { username, email } = req.body
    const userExists = await User.findOne({username})
    const emailExists = await User.findOne({email})
    console.log('lalaal',userExists)

    if ((!req.body.username && !req.body.email) || !req.body.password) {
        return res.status(400).send({ message: 'need email or username and password' })
    }

    if (userExists && emailExists) {
        return res.status(400).json({
            message: 'email o username ya está en uso'
        })
    }

    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ user, token })
})

export { newToken, verifyToken, signup }
