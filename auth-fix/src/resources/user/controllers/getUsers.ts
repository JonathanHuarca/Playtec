import crudControllers from '../../../utils/crud'
import catchAsync from '../../../utils/catchAsync'
import { User } from '../../../service/auth/models'

const errorMsg = 'error getUsers controller'

const getUsers = catchAsync(errorMsg, async (req, res) => {
  const options = {}
  const populate = {
    path:'courses',
    model:'courses'
  }
  const crud = crudControllers(User, options, populate)
  crud.getMany(req, res)
})

export default getUsers