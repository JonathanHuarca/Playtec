import catchAsync from "../../../../utils/catchAsync";
import {videoModel} from '../../model'

const errorMessage: String = "Error en update video controller"

const messages = {
   success: {
       es: 'Video actualizado correctamente',
       en: 'Video updated successfully'
   },
   error: {
       es: 'Error al actualizar video',
       en: 'Failed to update video'
   },
   notFound : {
       es : 'Video no encontrada',
       en : 'Video not found '
   }
}

const updateVideo = catchAsync(errorMessage, async(req, res, next) => {
    const {language} = req

    const {id_video} = req.body

    const video = await videoModel.findById(id_video)
    if(!video){
        return res.status(400).json({
            message : messages.notFound[language]
        })
    }
        const videoUpdate = await videoModel
                            .findByIdAndUpdate( 
                                id_video, 
                                req.body, 
                                {new: true}
                            )
                            .lean()
                            .exec()

        res.status(200).json({ 
            message: messages.success[language], 
            video: videoUpdate 
        })
    
})

export default updateVideo