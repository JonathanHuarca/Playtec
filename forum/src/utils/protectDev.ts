import catchAsync from './catchAsync'
import * as model from '../resources/service/model'
const msg = 'Error en protectDev'
const protectDev = catchAsync(msg, async (req, res, next) => {

  const { username } = req.body

  const user = await model.User.findOne({username})
  console.log(user)
  req.user = user

  next()
})

export default protectDev 
