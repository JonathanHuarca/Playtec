import apiAdapter from '../../utils/apiAdapter'

const {
  NODE_ENV,
  COURSES_URL,
  COURSES_URL_PROD
 } = process.env

const BASE_URL = NODE_ENV === 'production' ? COURSES_URL_PROD : COURSES_URL
console.log('url',BASE_URL)
const api = apiAdapter(BASE_URL)

const courses = async ( req, res ) => {
  try{
    const { authorization } = req.headers
    console.log('headers', authorization)
    console.log('body', req.body)
    const { data } = await api.post(
      req.path, 
      req.body, 
      {headers:{
        "Authorization": authorization
      }})
    res.status(200).json(data)
  }catch(e){
    if(e.response){
      return res.status(500).json(e.response.data)
    }
    res.status(500).json(e.message)
  }
}

export default courses