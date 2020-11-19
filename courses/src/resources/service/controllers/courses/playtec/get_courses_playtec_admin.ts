import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model";

const messages = {
    success: {
        es: 'Cursos encontrados',
        en: 'Courses founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout results'
    },
    errorMessage: 'Error en getCoursesPlaytecAdmin controller'
}

const getCoursesPlaytecAdmin = catchAsync( messages.errorMessage, async ( req, res ) => {
    const { language } = req

    const courses = await model.PlaytecCourse
        .find()
        .lean()
        .exec()

    if ( !courses.length ) {
        return res.json( { message: messages.error[ language ] } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        courses
    } )
} )

export default getCoursesPlaytecAdmin