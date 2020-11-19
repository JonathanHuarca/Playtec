import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Unidad actualizada',
        en: 'Unity updated'
    },
    errorMessage: 'Error en updateUnity controller'
}

const updateUnity = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req || 'es'

    const { unity_id } = req.body

    const unity = await model.PlaytecCourseUnity
        .findByIdAndUpdate(
            unity_id,
            req.body,
            { new: true }
        )
        .lean()
        .exec()

    res.status( 200 ).json( {
        message: messages.success[ language ],
        unity
    } )

} )

export default updateUnity