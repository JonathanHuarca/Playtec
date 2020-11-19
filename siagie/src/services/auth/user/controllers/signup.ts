import config from '../../../../config'
import errorResponse from '../../../../utils/errorResponse'
import { User } from '../models/'
import jwt from 'jsonwebtoken'

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


const signup = async (req, res) => {
    if (!req.body.nickname || !req.body.password) {
        return res.status(400).send({ message: 'need nickname and password' })
    }

    try {
        const user = await User.create(req.body)
        const token = newToken(user)
        return res.status(201).send({user, token})
    } catch (e) {
        return res.status(500).end('Error signup')
    }
}

export { newToken, verifyToken, signup }
