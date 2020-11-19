import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Presentación creada correctamente',
        en: 'Presentation created successfully'
    },
    errorMessage: 'Error en createPresentation Controller'
}

const createPresentation = catchAsync( messages.errorMessage, async ( req, res ) => { 
    
    const { language } = req
    
    const { id_class } = req.body
    
    const presentation = await model.Presentation.create( req.body )
    
    res.status( 200 ).json( {
        message: messages.success[ language ],
        presentation
    })
} )

export default createPresentation