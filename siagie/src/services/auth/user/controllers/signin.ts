import { newToken } from '../controllers'
import { User } from '../models/'

export const signin = async (req, res) => {
    if (!req.body.nickname || !req.body.password) {
        return res.status(400).send({ message: 'need nickname and password' })
    }

    const invalid = { message: 'Invalid nickanme and passoword combination' }

    try {
        const user = await User.findOne({ nickname: req.body.nickname })
        .select('nickname email password')
        .exec()

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