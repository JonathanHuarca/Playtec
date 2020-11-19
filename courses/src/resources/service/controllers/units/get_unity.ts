import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Unidad encontrado',
        en: 'Unity founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout results'
    },
    errorMessage: 'Error en getUnity controller'
}

const getUnity = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req || 'es'

    const { unity_id } = req.body

    const unity = await model.PlaytecCourseUnity
        .findById( unity_id )
        .lean()
        .exec()

    if ( !unity ) {
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        unity
    } )

} )

export default getUnity