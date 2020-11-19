import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Registro eliminado',
        en: 'Register deleted'
    },
    errorMessage: 'Error en deletePresentation controller'
}

const deletePresentation = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { id_presentation } = req.body
    
    await model.Presentation.findByIdAndRemove( id_presentation )
    
    res.status( 200 ).json( {
        message: messages.success[ language ]
    } )

} )

export default deletePresentation