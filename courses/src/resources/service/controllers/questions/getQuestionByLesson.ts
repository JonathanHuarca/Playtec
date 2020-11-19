import catchAsync from "../../../../utils/catchAsync";
import {questionModel} from '../../model'

const errorMessage: String = "Error en get questions by lesson controller"

const messages = {
   success: {
       es: 'Todas las preguntas de la clase encontradas',
       en: 'All questions lessons found'
   },
   error: {
       es: 'Error al buscar preguntas',
       en: 'Failed to find questions'
   }
}

const getQuestionsByLesson = catchAsync(errorMessage,async (req, res) => {
    const { language } = req   
    const { id_lesson} = req.body
    const questions = await questionModel.find({id_lesson:id_lesson})

    res.status(200).json({
        message : messages.success[language],
        questions : questions
    })
   

  
})

export default getQuestionsByLesson