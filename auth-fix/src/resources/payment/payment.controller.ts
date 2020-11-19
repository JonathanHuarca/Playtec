import apiAdapter from '../../utils/apiAdapter'

const {
  NODE_ENV,
  PAYMENT_URL,
  PAYMENT_URL_PROD
 } = process.env

const BASE_URL = NODE_ENV === 'production' ? PAYMENT_URL_PROD: PAYMENT_URL
// console.log('url',BASE_URL)

const api = apiAdapter(BASE_URL)

const payment = async ( req, res ) => {
  try{
    const { authorization } = req.headers
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

export default payment