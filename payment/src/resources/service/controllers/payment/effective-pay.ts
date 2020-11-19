import mp from 'mercadopago'
import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'

const msg = 'Error en el controlador efectivePay'

mp
  .configurations
  .setAccessToken(process.env.MERCADO_PAGO_KEY);

const effectivePay = catchAsync(msg, async (req, res, next) => {

  console.log("ejecutando effective pay")
  const {
    _id:user_id
  } = req.user
  const bearer = req.headers.authorization
  console.log('beare ********r', bearer)
  const token = bearer.split('Bearer ')[1].trim()
  const {
    sendPay
  } = req.body
  
  
  const data = await mp.payment.create(sendPay)
  console.log('data ================2', data.body.payer)
  const pay_id = data.body.id
  
  const pay = await model.Pay.create({...req.body, pay_id, user_id, token})

  console.log('pay effective pay ===', pay)
  res.status(200).json({
    message:"pago creado",
    data,
    pay
  })

  
});

export default effectivePay