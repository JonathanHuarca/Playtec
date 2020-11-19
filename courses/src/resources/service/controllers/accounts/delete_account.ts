import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Cuenta eliminada',
        en: 'Account deleted'
    },
    error: 'Error',
    errorMessage: 'Error en deleteAccount controller'
}

const deleteAccount = catchAsync( messages.errorMessage, async ( req, res ) => { 

    const { language } = req || 'es'

    const { id_account } = req.body
    
    await model.Account
        .findByIdAndRemove( id_account )
        .lean()
        .exec()

    res.status( 200 ).json( {
        message: messages.success[ language ],
    })
    
} )

export default deleteAccount