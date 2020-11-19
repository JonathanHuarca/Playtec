import catchAsync from "../../../utils/catchAsync";
import * as model from "../../models"

const messages = {
    success: {
        es: 'Tarea asignada correctamente',
        en: 'Task assigned correctly'
    },
    errorMessage: 'Error en assignTask controller'
}

const assignTask = catchAsync( messages.errorMessage, async ( req, res ) => {
    const { language } = req

    const work = await model.Task.create( req.body )

    res.json( {
        message: messages.success[ language ],
        work
    } )

} )

export default assignTask