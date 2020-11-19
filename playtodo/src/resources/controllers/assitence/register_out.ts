import catchAsync from "../../../utils/catchAsync";
import * as model from "../../models"
import moment from 'moment-timezone'

const messages = {
    success: {
        es: 'Tu salida fue registrada',
        en: 'Your departure was recorded'
    },
    error: {
        es: 'No se encontró la asistencia',
        en: 'Assistence not found'
    },
    errorMessage: 'Error en registerOut controller'
}

const registerOut = catchAsync( messages.errorMessage, async ( req, res ) => {
    const { language } = req

    const { id_assistence } = req.body

    const departure_time = moment().tz( 'America/Lima' ).format( 'DD-MM-YYYY HH:mm' ).toString()

    const assistence = await model.Assistence
        .findByIdAndUpdate(
            id_assistence,
            { departure_time },
            { new: true }
        )
        .lean()
        .exec()

    if ( !assistence )
        res.json( { message: messages.error[ language ] } )

    res.json( {
        message: messages.success[ language ],
        assistence
    } )

} )

export default registerOut