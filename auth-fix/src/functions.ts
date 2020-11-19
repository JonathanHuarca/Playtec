import * as userController  from './resources/user/controllers'
import courses from './resources/course/course.controller'
import payment from './resources/payment/payment.controller'
import siagie from './resources/siagie/siagie.controller'
import community from './resources/community/community.controller'
import calendary from './resources/calendary/calendary.controller'

const fn = async (req, res, next) => {
  let fname:any;
  console.log('lala', req.service, req.fname)
  switch(req.service){
    case 'users':
      fname = userController[req.fname]
      break;
    case 'courses':
      fname = courses
      break;
    case 'siagie':
      fname = siagie
      break;
    case 'pay':
      fname = payment
      break;
    case 'community':
      fname = community
      break;
    case 'calendary':
      fname = calendary
      break;
    default:
      return res.status(500).json({message:'Servicio no existe'})
  }
  
  
  if(!fname) {
    return res.status(500).json({message:'fname no existe!!'})
  }

  return fname(req, res, next)
}

export default fn
