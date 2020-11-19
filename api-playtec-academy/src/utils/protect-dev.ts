import catchAsync from './catchAsync'
import { User } from '../service/auth/models'
const msg = ""
const protectDev = catchAsync(msg, async (req, res, next) => {
  const { username } = req.body
  const user = await User.findOne({
    username
  })
  req.user = user
  next()
})

export default protectDev 
