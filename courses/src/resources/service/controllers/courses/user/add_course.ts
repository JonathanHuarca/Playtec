import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model"

const messages = {
    success: {
        es: 'Curso agregado a su lista correctamente',
        en: 'Course added correctly to your list'
    },
    error: {
        es: 'No se encontró el curso',
        en: 'Course not found'
    },
    provider: {
        es: 'Debe proporcionar un id de curso',
        en: 'You must provide a course id'
    },
    errorMessage: 'Error en addCourse controller'
}

const addCourse = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { id_course, state } = req.body

    // Unidades
    const units: any = await model.PlaytecCourseUnity
        .find( { course: id_course } )
        .lean()
        .exec()

    // Sections
    if ( units.lenght ) {
        await Promise.all( units.map( async unity => {
            unity.sections = []
            unity.state = 0

            const sections: any = await model.PlaytecCourseSection
                .find( { chapter: unity._id } )
                .lean()
                .exec()

            sections.map( section => {
                section.state = 0
                unity.sections.push( section )
            } )
        } )
        )
    }


    const course_playtec = await model.UserCourses.create( {
        course: id_course,
        units,
        buy: state,
        user: req.body.id_user || req.user._id,
    } )

    res.status( 200 ).json( {
        message: messages.success[ language ],
        course_playtec
    } )

} )

export default addCourse