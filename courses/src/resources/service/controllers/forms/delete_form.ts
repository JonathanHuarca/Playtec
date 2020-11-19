import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const errorMessage: String = 'Error en delete form controller'

const messages = {
    success: {
        es: 'Formulario eliminado correctamente',
        en: 'Form deleted correctly'
    },
    error: {
        es: 'Ocurrió un error ',
        en: 'An error occurred '
    }
}

const deleteForm = catchAsync( errorMessage, async ( req, res ) => { 

    const { language } = req

    const { id_form } = req.body 
    
    const form = await model.Form
        .findByIdAndRemove( id_form )
        .lean()
        .exec()
    
    if ( !form ) { 
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ]
    })

} )

export default deleteForm