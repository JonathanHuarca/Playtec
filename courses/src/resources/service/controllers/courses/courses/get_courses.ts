import catchAsync from "../../../../../utils/catchAsync";
import * as model from '../../../model'

const messages = {
    success: {
        es: 'Cursos encontrados',
        en: 'Courses finded'
    },
    error: {
        es: 'No se encontraron resultados',
        en: 'Courses not found'
    },
    errorMessage: "Error en getCourses controller"
}

const getCourses = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const courses = await model.Course
        .find( { createdBy: req.user._id } )
        .populate( {
            path: 'createdBy',
            model: 'users'
        } )
        .lean()
        .exec()

    if ( !courses.length ) {
        return res.json( {
            message: messages.error[ language ]
        } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        courses
    } )

} )

export default getCourses