import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'


const errorMessage = 'Error en el controlador deleteCalendary'

const messages = {

    success: {
  
      es: "Calendario eliminado correctamente",
      en: "Calendar deleted successfully"
    },
  
    notFound: {
  
      es: "Calendario no encontrado",
      en: "Calendar not found"

    },
  
    membership: {
  
      es: "Este calendario no se pudo eliminar por que no le pertenece",
      en: "This calendar could not be deleted because it does not belong to you"
    },
  
    errorMessage: 'Error en deleteCalendary controller'
  };

const deleteCalendary=catchAsync(errorMessage,async(req,res,next)=>{

    const {language} = req || 'es'
    const { _id:user, name,nickname } = req.user
    const{calendary_id}=req.body 
    const calendary=await model.Calendary.findById(calendary_id)

    if(!calendary){
        return res.status(400).json({
            message:messages.notFound[ language ],
            delete:false
            
        })
    }
     
    if(calendary.user ==user){
        await model.Calendary.findByIdAndRemove(calendary_id)
        res.status(200).json({
        message:messages.success[ language ],
        delete:true
    })
    }

    else{

        res.status(400).json({
        message: messages.membership[language],
        delete:false
        });

    }});

     
export default deleteCalendary