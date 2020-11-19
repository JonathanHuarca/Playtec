import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Sección encontrada',
        en: 'Section founded'
    },
    error: {
        es: 'No se encontró sección',
        en: 'Section not found'
    },
    errorMessage: 'Error en getSection controller'
}

const getSection = catchAsync( messages.errorMessage, async ( req, res ) => { 

    const { language } = req || 'es'

    const { section_id } = req.body
    
    const section = await model.PlaytecCourseSection
        .findById( section_id )
        .lean()
        .exec()
    
    res.status( 200 ).json( {
        message: messages.success[ language ],
        section
    } )

} )

export default getSection