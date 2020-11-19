import catchAsync from "../../../../utils/catchAsync";
import {videoModel} from '../../model'

const errorMessage: String = "Error en get One video controller"

const messages = {
   success: {
       es: 'Video encontrado',
       en: 'Video found'
   },
   error: {
       es: 'Error al buscar video',
       en: 'Failed to find video'
   },
   notFound : {
       es : 'Video no encontrada',
       en : 'Video not found'
   }
}

const getOneVideo = catchAsync(errorMessage,async (req, res) => {
    const { language } = req   
    const { id_video } = req.body
    const video = await videoModel.findById(id_video)
    if(!video){
        return res.status(400).json({
            message : messages.notFound[language]
        })
    }
        res.status(200).json({
            message : messages.success[language],
            video : video
        })
     

  
})

export default getOneVideo