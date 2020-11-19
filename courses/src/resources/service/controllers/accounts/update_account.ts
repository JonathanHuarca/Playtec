import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Cuenta actualizada',
        en: 'Account updated'
    },
    error: {
        es: 'Error al actualizar',
        en: 'Not updated'
    },
    errorMessage: 'Error en updateAccount controller'
}

const updateAccount = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req || 'es'

    const { id_account } = req.body

    const account = await model.Account
        .findByIdAndUpdate(
            id_account,
            req.body,
            { new: true },
        )
        .lean()
        .exec()

    res.status( 200 ).json( {
        message: messages.success[ language ],
        account
    })

} )

export default updateAccount