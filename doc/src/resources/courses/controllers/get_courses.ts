import catchAsync from "../../../utils/catchAsync";
import * as model from '../model'

const errorMessage: String = "Error en get courses controller"

const messages = {
    success: {
        es: 'Cursos encontrados',
        en: 'Courses finded'
    },
    error: {
        es: 'No se encontraron resultados',
        en: 'Courses not found'
    }
}

const getCourses = catchAsync(errorMessage, async (req, res) => {
    const {language} = req

    const courses = await model.Course
                                .find()
                                .lean()
                                .exec()

    if(courses.length === 0) {
        return res.json({
            message: messages.error[language]
        })
    }
    
    res.status(200).json({
        message: messages.success[language],
        courses
    })
    
})

export default getCourses