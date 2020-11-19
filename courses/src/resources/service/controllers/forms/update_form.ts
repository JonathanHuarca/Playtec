import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const errorMessage: String = 'Error en update form controller'

const messages = {
    success: {
        es: 'Formulario actualizado correctamente',
        en: 'Form updated correctly',
    },
    error: {
        es: 'Fomulario no encontrado',
        en: 'Form not found'
    }
}

const updateForm = catchAsync( errorMessage, async ( req, res ) => {

    const { language } = req

    const { id_form } = req.body

    const form = await model.Form
        .findByIdAndUpdate(
            id_form,
            req.body,
            { new: true }
        )
        .lean()
        .exec()
    
    if ( !form ) { 
        return res.json( { message: messages.error[ language ] } )
    }
    
    res.status( 200 ).json( {
        message: messages.success[ language ],
        form
    } )

} )

export default updateForm