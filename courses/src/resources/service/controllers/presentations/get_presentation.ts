import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Presentación encontrada',
        en: 'Presentation founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Without results'
    },
    errorMessage: 'Error en getPresentation controller'
}

const getPresentation = catchAsync( messages.errorMessage, async ( req, res ) => {
    
    const { language } = req
    
    const { id_presentation } = req.body
    
    const presentation = await model.Presentation
        .findById( id_presentation )
        .lean()
        .exec()
    
    if ( !presentation ) { 
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        presentation
    })

} )

export default getPresentation