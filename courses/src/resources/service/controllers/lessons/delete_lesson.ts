import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const errorMessage: String = "Error en delete lesson controller"

const messages = {
    success: {
        es: 'Clase eliminada correctamente',
        en: 'Lesson removed successfully'
    },
    error: {
        es: 'Error al buscar clase',
        en: 'Failed to find lesson'
    },
    notFound: {
        es: 'Clase no encontrada',
        en: 'Lesson not found'
    }
}

const deleteLesson = catchAsync( errorMessage, async ( req, res, next ) => {
    const { language } = req

    const { lesson_id: _id } = req.body
    const lesson = await model.lessonModel.findById( _id )

    if ( !lesson ) {
        return res.status( 400 ).json( {
            message: messages.notFound[ language ]
        } )
    }

    await model.lessonModel.findByIdAndRemove( _id )

    res.status( 200 ).json( {
        message: messages.success[ language ]
    } )


} )

export default deleteLesson