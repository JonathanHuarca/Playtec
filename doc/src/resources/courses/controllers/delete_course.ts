import catchAsync from "../../../utils/catchAsync"
import * as model from '../model';

const errorMessage: String = "Error en delete course"

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

const deleteCourse = catchAsync(errorMessage, async(req, res, next) => {
    const {language} = req

    const { id_course: _id } = req.body

    await model.Course.findByIdAndRemove(_id)
    
    res.status(200).json({
        message: messages.success[language]
    })
})

export default deleteCourse