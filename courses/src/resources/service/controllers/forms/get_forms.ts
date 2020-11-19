import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"
import { models } from "mongoose";

const errorMessage: String = 'Error en get forms controller'

const messages = {
    success: {
        es: 'Formulario encontrados encontrados',
        en: 'Forms founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout results'
    }
}

const getForms = catchAsync( errorMessage, async ( req, res ) => { 
    
    const { language } = req

    const forms = await model.Form
        .find()
        .lean()
        .exec()
    
    if ( !forms.length ) { 
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        forms
    })
    
} )

export default getForms