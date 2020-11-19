import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const errorMessage: String = 'Error en get form controller'

const messages = {
    success: {
        es: 'Formulario encontrado',
        en: 'Form founded'
    },
    error: {
        es: 'Formulario no encontrado',
        en: 'Form not found'
    }
}

const getForm = catchAsync( errorMessage, async ( req, res ) => { 

    const { language } = req

    const { id_form } = req.body

    const form = await model.Form
        .findById( id_form )
        .lean()
        .exec()
    
    if ( !form ) { 
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        form
    })
    
} )

export default getForm