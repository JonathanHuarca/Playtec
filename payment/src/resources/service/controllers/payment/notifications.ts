import axios from 'axios'
import * as model from '../../model'



const notifications = async (req, res) => {
    
    if(req.body.action === 'payment.updated'){
        try{
            console.log('req.body notifications --------------', req.body)
            const pay:any = await model.Pay.find({pay_id:req.body.data.id}).lean()
            console.log('pay ----', pay)
            const data = await axios({
                method:'POST',
                url:'https://coursesplaytecv2.herokuapp.com/api',
                headers:{
                    Authorization:`Bearer ${pay.token}`
                },
                data:{
                    fname:'updateCoursePlaytec',
                    service:'courses',
                    language:'es',
                    id_course:pay.course_id,
                    state:1
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
        
    }
    
    res.status(200).send('OK') // se envia a mercadopago
}

export default notifications