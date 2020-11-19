import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Secciones encontradas',
        en: 'Sections founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout results'
    },
    errorMessage: 'Error en getSections controller'
}

const getSections = catchAsync( messages.errorMessage, async ( req, res ) => { 

    const { language } = req
    const { unity_id } = req.body

    const sections = await model.PlaytecCourseSection
        .find({ unity:unity_id })
        .lean()
        .exec()
    
    if ( !sections.length ) { 
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        sections
    })

} )

export default getSections