import catchAsync from "../../../../utils/catchAsync";
import {questionModel} from '../../model'

const errorMessage: String = "Error en delete question controller"

const messages = {
   success: {
       es: 'Pregunta eliminada correctamente',
       en: 'Question removed successfully'
   },
   error: {
       es: 'Error al buscar pregunta',
       en: 'Failed to find questions'
   },
   notFound : {
       es : 'Pregunta no encontrada',
       en : 'Question not found'
   }
}

const deleteQuestion = catchAsync(errorMessage, async(req, res, next) => {
    const { language } = req

    const { id_question } = req.body
    const question = await questionModel.findById(id_question)
    if(!question){
        return res.status(400).json({
            message : messages.notFound[language]
        })
    }    
        await question.remove()
    
        res.status(200).json({
            message: messages.success[language]
        })
    
    
})

export default deleteQuestion