import catchAsync from "../../../utils/catchAsync";
import * as model from '../model'

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

const editCourse = catchAsync(errorMessage, async(req, res, next) => {
    const {language} = req

    const {id_course: _id} = req.body

    const course = await model.Course
                            .findByIdAndUpdate( 
                                _id, 
                                req.body, 
                                {new: true}
                            )
                            .lean()
                            .exec()

    res.status(200).json({ 
        message: messages.success[language], 
        course: course 
    })
})

export default editCourse