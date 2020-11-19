import { newToken } from './signup'
import { User } from '../models'

const signin = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: 'need username or email and password' })
    }

    const invalid = { message: 'Invalid username or email and passoword combination' }

    try {
        const user = await User.findOne({username:req.body.username})
        .select('email username password')
        .exec()
        console.log('user', user)
        if (!user) {
            return res.status(401).send(invalid)
        }
        console.log(user)

        const match = await user.schema.methods.checkPassword(user, req.body.password)

        if (!match) {
            return res.status(401).send(invalid)
        }

        const token = newToken(user)
            return res.status(201).json({ 
                user:user,
                token:token
            })
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
}

export { signin }



