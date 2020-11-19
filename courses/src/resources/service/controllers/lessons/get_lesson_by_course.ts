import catchAsync from "../../../../utils/catchAsync";
import { lessonModel } from '../../model'

const errorMessage: String = "Error en get lesson by course controller"

const messages = {
    success: {
        es: 'Todas las clases del curso encontradas',
        en: 'All course classes found'
    },
    error: {
        es: 'Error al buscar clases',
        en: 'Failed to find classes'
    }
}

const getLessonByCourse = catchAsync( errorMessage, async ( req, res ) => {
    const { language } = req
    const { course_id } = req.body
    const lessons = await lessonModel.find( { course_id: course_id } )

    res.status( 200 ).json( {
        message: messages.success[ language ],
        lessons: lessons
    } )



} )

export default getLessonByCourse