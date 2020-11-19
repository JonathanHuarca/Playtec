import catchAsync from "../../../utils/catchAsync";
import * as model from '../model'

const errorMessage: String = "Error en get idcourses controller"

const messages = {
    success: {
        es: 'Curso encontrado',
        en: 'Course finded'
    },
    error: {
        es: 'Curso no encontrado',
        en: 'Course not found'
    }
}


const getCourse = catchAsync(errorMessage, async (req, res) => {
    const {language} = req

    const {id_course: _id} = req.body

    if(!_id) {
        return res.status(500).json({
            message: "you have to provide a id"
        })
    }

    let data = await model.Course
                        .findById(_id)
                        .lean()
                        .exec()
    
    if(!data) {
        return res.json({
            message: messages.error[language]
        })
    }

    res.status(200).json({
        message: messages.success[language],
        data
    })
})

export default getCourse