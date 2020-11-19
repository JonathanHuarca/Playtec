import catchAsync from "../../../../utils/catchAsync";
import {videoModel} from '../../model'

const errorMessage: String = "Error en get all videos controller"

const messages = {
   success: {
       es: 'Todas los videos encontrados',
       en: 'All videos found'
   },
   error: {
       es: 'Error al buscar videos',
       en: 'Failed to find videos'
   }
}

const getAllVideos = catchAsync(errorMessage,async (req, res) => {
   const { language } = req   

   const videos = await videoModel.find().lean()

   res.status(200).json({
       message : messages.success[language],
       videos : videos
   })
   

  
})

export default getAllVideos