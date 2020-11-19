import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const messages = {
    success: {
        es: 'Cuentra registrada',
        en: 'Account registered'
    },
    error: {
        es: 'No se registró la cuenta',
        en: 'Error when registering account'
    },
    errorMessage: 'Error en createAccount controller'
}

const createAccount = catchAsync( messages.errorMessage, async ( req, res ) => {
    const { language } = req || 'es'

    const account = await model.Account.create( req.body )

    res.status( 200 ).json( {
        message: messages.success[ language ],
        account
    } )

} )

export default createAccount