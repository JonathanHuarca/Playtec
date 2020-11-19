import mp from 'mercadopago'
import axios from 'axios'
import catchAsync from '../../../../utils/catchAsync'

const msg = 'Error en el controlador processPay'

mp
  .configurations
  .setAccessToken(process.env.MERCADO_PAGO_KEY);

const processPay = catchAsync(msg, async (req, res) => {
  
  const { 
    sendPay, 
    course_id
  } = req.body

  const data = await mp.payment.save(sendPay)

  const bearer = req.headers.authorization
  const token = bearer.split('Bearer ')[1].trim()

  try{
    console.log('req.body notifications --------------', req.body)
    console.log("ejecutando processs pay -------")
    
    const data = await axios({
        method:'POST',
        url:'https://courses-playtec-v4.herokuapp.com/api',
        headers:{
            Authorization:`Bearer ${token}`
        },
        data:{
            fname:'addPlaytecCourseToUser',
            service:'courses',
            language:'es',
            course_id:course_id
        }
    })
    console.log(data.data)
  }catch(e){
      if(e.response){
          console.log(e.response.data)
      }else{
          console.log(e)
      }
  }
  res.status(200).json(data)
});

export default processPay