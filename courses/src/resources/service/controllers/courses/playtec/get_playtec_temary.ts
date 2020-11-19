import catchAsync from "../../../../../utils/catchAsync"
import * as model from "../../../model"

const messages = {
    success: {
        es: 'Temario encontrado',
        en: 'Temary founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Whitout results'
    },
    errorMessage: 'Error en getTemary controller'
}

const getPlaytecTemary = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req
    const { _id } = req.user
    const { course_id, state } = req.body


    // temario  ===============
    const course1 = await model.PlaytecCourse.findById(course_id)
    const units1 = await model.PlaytecCourseUnity.find({course:course_id})
    const units2 = await model.UserPlaytecUnity.find({
        course:course_id,
        user:_id
    }).populate({
        path:"unity",
        model:"playtec_course_units"
    })
    // ========================
    
    const course = await model.UserPlaytecCourse.findOne({
        course:course_id,
        user: _id
    }).populate({
        path:"course",
        model:"playtec_courses",
        select:"course_name"
    }).select("progress course_name")

    

    const units = await Promise.all( units2.map(async (unity:any) => {
        let data = {
            progress:unity.progress,
            _id:unity.unity._id,
            number_unity:unity.unity.number_unity,
            unity_name: unity.unity.unity_name,
            sections: await model.UserPlaytecSection.find({
                unity:unity.unity,
                user:_id
            }).populate({
                path:"section",
                model:"playtec_course_sections",
                select:"-unity -updateAt -user -createAt"
            })
        }
        return data 
        
    }))

    // const sections = await model.UserPlaytecSection.find({
        
    // })
    // .select("unity progress status")
    


    // ========================   

    res.status(200).json({
        message:"Temario",
        course,
        units
    })
})

export default getPlaytecTemary