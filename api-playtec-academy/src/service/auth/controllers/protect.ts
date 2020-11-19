import { User } from '../models'
import catchAsync from '../../../utils/catchAsync'
import { verifyToken } from './signup'

const protect = catchAsync( 'Error in protect controller',async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end('Unauthorized')
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload

    payload = await verifyToken(token)

    if(!payload){
        return res.status(200).json({
            message:'Token no existe o a expirado!!',
            state : false
        })
    }

    const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec()

    if (!user) {
        return res.status(401).end('User undefined')
    }

    req.user = user
    next()
})

export { protect }