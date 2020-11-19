import catchAsync from "../../../../utils/catchAsync";
//import {lessonModel} from '../models'
import {questionModel} from '../../model'

const errorMessage: String = "Error en create question controller"

const messages = {
   success: {
       es: 'Pregunta creada correctamente',
       en: 'Question created successfully'
   },
   error: {
       es: 'Error al crear pregunta',
       en: 'Question creation failed'
   }
}

const createQuestion = catchAsync(errorMessage,async (req, res) => {
   const { language } = req

   const newQuestion  = await questionModel.create(req.body)
   res.status(200).json(
      {
         message : messages.success[language],
         question : newQuestion
      }
   )

  
})

export default createQuestion