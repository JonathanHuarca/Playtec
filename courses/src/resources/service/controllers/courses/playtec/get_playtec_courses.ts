import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model"

const messages = {
    success: {
        es: 'Cursos encontrados',
        en: 'Courses finded'
    },
    error: {
        es: 'No se encontraron resultados',
        en: 'Courses not found'
    },
    errorMessage: "Error en getPlaytecCourses controller"
}

const getPlaytecCourses = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req
    
    const courses = await model.PlaytecCourse
        .find({publish:true})
        .populate( {
            path: "createdBy",
            model: "users"
        }).populate({
            path:"teacher.image certified.image images.main images.detail images.modal",
            model:"files"
        })
        .lean()
        .exec()
    let userCourse1:any = []
    if(req.user){
        const userCourses:any = await model.UserPlaytecCourse
        .find({user:req.user._id})    
        .lean()
        userCourse1 = userCourses
    }
    

    res.status( 200 ).json( {
        message: messages.success[ language ],
        courses,
        userCourses:userCourse1
    })
})

export default getPlaytecCourses