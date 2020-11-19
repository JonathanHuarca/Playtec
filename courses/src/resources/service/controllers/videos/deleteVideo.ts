import catchAsync from "../../../../utils/catchAsync";
import {videoModel} from '../../model'

const errorMessage: String = "Error en delete video controller"

const messages = {
   success: {
       es: 'Video eliminado correctamente',
       en: 'Video removed successfully'
   },
   error: {
       es: 'Error al buscar video',
       en: 'Failed to find video'
   },
   notFound : {
       es : 'Video no encontrado',
       en : 'Video not found'
   }
}

const deleteVideo = catchAsync(errorMessage, async(req, res, next) => {
    const { language } = req

    const { id_video } = req.body
    const video = await videoModel.findById(id_video)
    if(!video){
        return res.status(400).json({
            message : messages.notFound[language]
        })
    }
        await videoModel.findByIdAndRemove(id_video)
    
        res.status(200).json({
            message: messages.success[language]
        })
    
    
})

export default deleteVideo