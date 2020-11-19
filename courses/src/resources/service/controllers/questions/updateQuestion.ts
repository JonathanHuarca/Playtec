import catchAsync from "../../../../utils/catchAsync";
import {questionModel} from '../../model'

const errorMessage: String = "Error en update question controller"

const messages = {
   success: {
       es: 'Pregunta actualizada correctamente',
       en: 'Question updated successfully'
   },
   error: {
       es: 'Error al actualizar pregunta',
       en: 'Failed to update question'
   },
   notFound : {
       es : 'Pregunta no encontrada',
       en : 'Question not found '
   }
}

const updateLesson = catchAsync(errorMessage, async(req, res, next) => {
    const {language} = req

    const { id_question } = req.body

    const question = await questionModel.findById(id_question)
    if(!question){
        return res.status(400).json({
            message : messages.notFound[language]
        })
    }
        const questionUpdate = await questionModel
                            .findByIdAndUpdate( 
                                id_question, 
                                req.body, 
                                {new: true}
                            )
                            .lean()
                            .exec()

        res.status(200).json({ 
            message: messages.success[language], 
            question: questionUpdate 
        })
    
})

export default updateLesson