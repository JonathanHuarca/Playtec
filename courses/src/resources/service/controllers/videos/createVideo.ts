import catchAsync from "../../../../utils/catchAsync";
//import {lessonModel} from '../models'
import {videoModel} from '../../model'

const errorMessage: String = "Error en create video controller"

const messages = {
   success: {
       es: 'Video creada correctamente',
       en: 'Video created successfully'
   },
   error: {
       es: 'Error al crear video',
       en: 'Video creation failed'
   }
}

const createVideo = catchAsync(errorMessage,async (req, res) => {
   const { language } = req

   const newVideo  = await videoModel.create(req.body)
   res.status(200).json(
      {
         message : messages.success[language],
         video : newVideo
      }
   )

  
})

export default createVideo