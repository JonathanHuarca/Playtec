import catchAsync from "../../../utils/catchAsync";
import * as model from '../model'

const errorMessage: String = "Error en add course controller"

const messages = {
    success: {
        es: 'Curso actualizado',
        en: 'Course updated'
    },
    error: {
        es: 'Error al actualizar',
        en: 'Updated failed'
    }
}

const addCourse = catchAsync(errorMessage, async (req, res) => {
    const {language} = req

    const {
        course_name: name,
        description: desc,
        createdBy  : id_user
    } = req.body
    
    const course = new model.Course({
        course_name: name,
        description: desc,
        createdBy  : id_user
    })

    await course.save()

    res.status(200).json({
        message: messages.success[language],
        course
    })

})

export default addCourse