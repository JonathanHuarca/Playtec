import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Unidad eliminada',
        en: 'Unity deleted'
    },
    errorMessage: 'Error en deleteUnity controller'
}

const deleteUnity = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req || 'es'

    const { unity_id } = req.body
    // borra secciones
    const unity = await model.PlaytecCourseUnity.findById(unity_id)
    
    if(!unity){
        return  res.status(500).json({
            message:"Unidad no existe!"
        })
    }
    await model.PlaytecCourseSection.deleteMany({unity:unity_id} )
    // borrar la unidad
    await model.PlaytecCourseUnity.findByIdAndRemove(unity_id)

    res.status( 200 ).json( {
        message: messages.success[ language ]
    } )

} )

export default deleteUnity