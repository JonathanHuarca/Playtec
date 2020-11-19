import apiAdapter from '../../../utils/apiAdapter'
import { User } from '../../../service/auth/models' 
const {
  NODE_ENV,
  COURSES_URL,
  COURSES_URL_PROD
 } = process.env

const BASE_URL = NODE_ENV === 'production' ? COURSES_URL_PROD : COURSES_URL

const api = apiAdapter(BASE_URL)

const addCourse = async ( req, res ) => {
  try{
    const { authorization } = req.headers
    const { user } = req

    const getUser:any = await User.findById(user._id)
    //** conseguir curso */
    const body = {
      fname:'getCourse',
      service:req.body.service,
      language:req.body.language,
      id_course:req.body.id_course
    }
    const { data } = await api.post(
      req.path, 
      body, 
      {headers:{
        "Authorization": authorization
      }})
    
    // --------------------
    getUser.courses = [...getUser.courses, data.data._id]
    getUser.save()

    res.status(200).json(getUser)
  }catch(e){
    if(e.response){
      return res.status(500).json(e.response.data)
    }
    res.status(500).json(e.message)
  }
}

export default addCourse