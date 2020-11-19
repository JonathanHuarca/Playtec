import crudControllers from '../../../utils/crud'
import catchAsync from '../../../utils/catchAsync'
import { User } from '../../../service/auth/models'

const errorMsg = 'error "getUser" controller'

const getUser = catchAsync(errorMsg, async (req, res) => {
  const { id_user:_id } = req.body
  console.log('id_user', req.body)
  const options = {
    _id
  }
  
  const populate = {
    path:'courses',
    model:'courses'
  }
  
  const crud = crudControllers(User, options, populate)
  crud.getOne(req, res)
})

export default getUser