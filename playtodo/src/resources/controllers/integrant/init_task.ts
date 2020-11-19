import catchAsync from "../../../utils/catchAsync";
import * as model from "../../models"
import moment from 'moment-timezone'

const messages = {
    success: {
        es: 'Tarea iniciada',
        en: 'Task started'
    },
    errorMessage: 'Error en initTask controller'
}

const initTask = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { task_id: id } = req.body

    const time_init = moment().tz( 'America/Lima' ).format( 'DD-MM-YYYY HH:mm' ).toString()

    const task = await model.Task
        .findByIdAndUpdate(
            id,
            { time_init },
            { new: true }
        )
        .lean()
        .exec()

    res.json( {
        message: messages.success[ language ],
        task
    } )

} )

export default initTask