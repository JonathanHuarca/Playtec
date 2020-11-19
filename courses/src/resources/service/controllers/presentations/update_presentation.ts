import { json } from 'body-parser';
import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Presentación actualizada',
        en: 'Presentation updated'
    },
    errorMessages: 'Error en updatePresentation controller'
}

const updatePresentation = catchAsync( messages.errorMessages, async ( req, res ) => { 

    const { language } = req
    
    const { id_presentacion } = req.body
    
    const presentation = await model.Presentation
        .findByIdAndUpdate(
            id_presentacion,
            req.body,
            { new: true }
        )
        .lean()
        .exec()
    
    res.status( 200 ).json( {
        message: messages.success[ language ],
        presentation
    })

} )

export default updatePresentation