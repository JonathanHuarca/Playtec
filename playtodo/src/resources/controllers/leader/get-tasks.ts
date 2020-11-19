import catchAsync from "../../../utils/catchAsync";
import * as model from "../../models"

const messages = {
    success: {
        es: 'Tareas encontradas',
        en: 'Tasks founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout results'
    },
    errorMessage: 'Error en getTasks controller'
}

const getTasks = catchAsync( messages.errorMessage, async ( req, res ) => {
    const { language } = req

    const tasks = await model.Task
        .find()
        .lean()
        .exec()

    if ( !tasks.length )
        res.json( { message: messages.error[ language ] } )

    res.json( {
        message: messages.success[ language ],
        tasks
    } )
} )

export default getTasks