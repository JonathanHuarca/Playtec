import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const errorMessage: String = 'Error en create form controller'

const messages = {
    success: {
        es: 'Formulario creado correctamente',
        en: 'Form created correctly'
    },
    error: {
        es: 'Error al crear formulario',
        en: 'Failed to create form'
    }
}

const createForm = catchAsync( errorMessage, async ( req, res ) => { 

    const { language } = req
    
    const form = await model.Form.create( req.body )

    res.status( 200 ).json( {
        message: messages.success[ language ],
        form
    })

} )

export default createForm