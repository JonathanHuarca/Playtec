import crudControllers from '../../../utils/crud'
import catchAsync from '../../../utils/catchAsync'
import { User } from '../../../service/auth/models'

const errorMsg = 'error "getUser" controller'

const getUser = catchAsync(errorMsg, async (req, res) => {
  console.log('asdadasdasdsada',req.user)
  const { username } = req.user
  const options = {
    username
  }
  
  const populate = {}
  
  const crud = crudControllers(User, options, populate)
  crud.getOne(req, res)
})

export default getUser