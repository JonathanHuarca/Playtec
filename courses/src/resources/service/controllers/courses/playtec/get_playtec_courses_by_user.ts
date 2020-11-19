import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model"

const messages = {
    success: {
        es: 'Cursos encontrados para el usuario',
        en: 'Courses found by user'
    },
    error: {
        es: 'No se encontraron resultados',
        en: 'Courses not found '
    },
    errorMessage: "Error en getPlaytecCourses controller"
}

const getPlaytecCoursesByUser = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req
    const { _id, name } = req.user
    const courses = await model.PlaytecCourse
        .find({createdBy:_id})
        .populate( {
            path: "createdBy",
            model: "users"
        }).populate({
            path:"teacher.image certified.image images.main images.detail images.modal",
            model:"files"
        })
        .lean()
        .exec()    

    res.status( 200 ).json( {
        message: messages.success[ language ],
        courses
    })
})

export default getPlaytecCoursesByUser