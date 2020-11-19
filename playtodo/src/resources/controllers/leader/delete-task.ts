import catchAsync from "../../../utils/catchAsync";
import * as model from "../../models"

const messages = {
    success: {
        es: 'Tarea borrada',
        en: 'Task deleted'
    },
    errorMessage: 'Error en deleteWork controller'
}

const deleteWork = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { work_id: id } = req.body

    const work = await model.Task.findByIdAndRemove( id )

    res.json( {
        message: messages.success[ language ],
        work
    } )

} )

export default deleteWork