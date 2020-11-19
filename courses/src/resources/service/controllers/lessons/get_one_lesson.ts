import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const errorMessage: String = "Error en get One lesson controller"

const messages = {
    success: {
        es: 'Clase encontrada',
        en: 'lesson found'
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

const getOneLesson = catchAsync( errorMessage, async ( req, res ) => {
    const { language } = req
    const { lesson_id, code } = req.body

    const lesson: any = await model.lessonModel
        .findById( lesson_id )
        .populate( {
            path: 'course_id',
            model: 'courses'
        } )
        .lean()
        .exec()

    if ( !lesson ) {
        return res.status( 400 ).json( {
            message: messages.notFound[ language ]
        } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        lesson: lesson
    } )



} )

export default getOneLesson