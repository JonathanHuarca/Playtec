import catchAsync from "../../../../utils/catchAsync";
import {questionModel} from '../../model'

const errorMessage: String = "Error en get One question controller"

const messages = {
   success: {
       es: 'Pregunta encontrada',
       en: 'Question found'
   },
   error: {
       es: 'Error al buscar pregunta',
       en: 'Failed to find question'
   },
   notFound : {
       es : 'Pregunta no encontrada',
       en : 'Question not found'
   }
}

const getOneQuestion = catchAsync(errorMessage,async (req, res) => {
    const { language } = req   
    const { id_question } = req.body
    const question = await questionModel.findById(id_question)
    if(!question){
        return res.status(400).json({
            message : messages.notFound[language]
        })
    }
        res.status(200).json({
            message : messages.success[language],
            question : question
        })
     

  
})

export default getOneQuestion