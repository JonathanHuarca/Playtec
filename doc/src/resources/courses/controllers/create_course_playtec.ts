import catchAsync from "../../../utils/catchAsync";
import { CoursePlaytec } from "../model";


const errorMessage: String = "Error en create course controller"

const messages = {
    success: {
        es: 'Curso creado',
        en: 'Course created'
    },
    error: {
        es: 'Error al crear',
        en: 'Create failed'
    },
    auth: {
        es: 'Rol de usuario no permitido',
        en: 'User role not allowed'
    }
}

const createCoursePlaytec = catchAsync( errorMessage, async ( req, res ) => {
    const { language } = req

    if ( req.body.rol == 0 ) { // Cambiar el modo de validación 

        const {
            course_name: name,
            description: desc,
            createdBy: id_user,
            price: price
        } = req.body

        const course = new CoursePlaytec( {
            course_name: name,
            description: desc,
            createdBy: id_user,
            price: price
        } )
        
        await course.save()

        res.status( 200 ).json( {
            message: messages.success[ language ],
            course
        } )
    } else { 
        res.status( 401 ).json( {
            message: messages.auth[ language ]
        } )
    }
    

})

export default createCoursePlaytec