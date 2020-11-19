import catchAsync from "../../../../utils/catchAsync";
import {questionModel} from '../../model'

const errorMessage: String = "Error en get all questions controller"

const messages = {
   success: {
       es: 'Todas las preguntas encontradas',
       en: 'All questions found'
   },
   error: {
       es: 'Error al buscar preguntas',
       en: 'Failed to find questions'
   }
}

const getAllLessons = catchAsync(errorMessage,async (req, res) => {
   const { language } = req   

   const questions = await questionModel.find().lean()

   res.status(200).json({
       message : messages.success[language],
       questions : questions
   })
   

  
})

export default getAllLessons