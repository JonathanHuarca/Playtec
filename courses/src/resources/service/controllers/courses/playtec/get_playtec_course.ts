import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model"

const messages = {
    success: {
        es: 'Curso encontrados',
        en: 'Courses finded'
    },
    error: {
        es: 'No se encontró curso',
        en: 'Course not found'
    },
    errorMessage: "Error en getPlaytecCourse controller"
}

const getPlaytecCourse = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req
    const { course_id } = req.body

    console.log('user', req.user)
    
    if(req.user){
        const userCourse:any = await model.UserPlaytecCourse
        .findOne({course:course_id, user:req.user._id})    
        .populate({
            path:"course",
            model:"playtec_courses",
            populate:{
                path:"teacher.image certified.image images.main images.detail images.modal",
                model:"files"
              }
        })
        .lean()

        if(!userCourse){
            const course = await model.PlaytecCourse
            .findById(course_id)
            .populate( {
                path: "createdBy",
                model: "users"
            }).populate({
                path:"teacher.image certified.image images.main images.detail images.modal",
                model:"files"
            })
            .lean()
            .exec()

    

            return res.status( 200 ).json( {
                message: messages.success[ language ],
                course,
                buy:false
            })
        }

        return res.status( 200 ).json( {
            message: messages.success[ language ],
            test:{...userCourse},
            course:{
                name:userCourse.course.name,
                description:userCourse.course.description,
                images:userCourse.course.images,
                teacher:userCourse.course.teacher,
                certified:userCourse.course.certified,
                price:userCourse.course.price,
                course_name:userCourse.course.course_name,
                category:userCourse.course.category,
                level:userCourse.course.level,
                code:userCourse.course.code,
                duration:userCourse.course.duration,
                progress:userCourse.progress,
                state:userCourse.state,
                
            },
            buy:!!userCourse
        })
    }

    const course = await model.PlaytecCourse
        .findById(course_id)
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
        course,
        buy:false
    })
})

export default getPlaytecCourse