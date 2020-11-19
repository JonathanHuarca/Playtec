import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const messages = {
    success: {
        es: 'Cuentas encontradas',
        en: 'Accounts founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout results'
    },
    errorMessage: 'Error en getAccounts controller'
}

const getAccounts = catchAsync( messages.errorMessage, async ( req, res ) => { 

    const { language } = req || 'es'

    const accounts = await model.Account
        .find()
        .lean()
        .exec()
    
    if ( !accounts.length ) { 
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        accounts
    })

} )

export default getAccounts