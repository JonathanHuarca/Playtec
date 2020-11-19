import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Presentaciones encontradas',
        en: 'Presentations founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Without results'
    },
    errorMessage: 'Error en getPresentations controller'
}

const getPresentations = catchAsync( messages.errorMessage, async ( req, res ) => { 

    const { language } = req
    
    const presentations = await model.Presentation
        .find()
        .lean()
        .exec()
    
    if ( !presentations.length ) { 
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        presentations
    } )

} )

export default getPresentations