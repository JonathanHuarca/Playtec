import catchAsync from "../../../../../utils/catchAsync";
import * as model from '../../../model'

const messages = {
    success: {
        es: 'Curso encontrado',
        en: 'Course finded'
    },
    error: {
        es: 'Curso no encontrado',
        en: 'Course not found'
    },
    provider: {
        es: 'Tienes que proveer un id del curso',
        en: 'You have to provide a id course'
    },
    errorMessage: "Error en getCourse controller"
}


const getCourse = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { id_course } = req.body

    let data = await model.Course
        .findById( id_course )
        .lean()
        .exec()

    if ( !id_course || !data ) {
        return res.status( 500 ).json( {
            message: `${messages.provider[ language ]} or ${messages.error[ language ]}`
        } )
    }

    res.status( 200 ).json( {
        message: messages.success[ language ],
        data
    } )
} )

export default getCourse