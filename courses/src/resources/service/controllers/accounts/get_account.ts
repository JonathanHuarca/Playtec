import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const messages = {
    success: {
        es: 'Cuenta encontrada',
        en: 'Account founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout result'
    },
    errorMessage: 'Error en getAccount controller'
}

const getAccount = catchAsync( messages.errorMessage, async ( req, res ) => { 

    const { language } = req || 'es'

    const { id_account } = req.body
    
    const account = await model.Account
        .findById( id_account )
        .lean()
        .exec()
    
    if ( !account ) { 
        return res.json( {
            message: messages.error[ language ]
        } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        account
    } )
    
} )

export default getAccount