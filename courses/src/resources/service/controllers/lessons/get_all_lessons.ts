import catchAsync from "../../../../utils/catchAsync";
import {lessonModel} from '../../model'

const errorMessage: String = "Error en get all lessons controller"

const messages = {
   success: {
       es: 'Todas las clases encontradas',
       en: 'All classes found'
   },
   error: {
       es: 'Error al buscar clases',
       en: 'Failed to find classes'
   }
}

const getAllLessons = catchAsync(errorMessage,async (req, res) => {
   const { language } = req   

   const lessons = await lessonModel.find().lean()

   res.status(200).json({
       message : messages.success[language],
       lessons : lessons
   })
   

  
})

export default getAllLessons