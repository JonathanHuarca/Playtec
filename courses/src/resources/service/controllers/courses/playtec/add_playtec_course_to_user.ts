import catchAsync from "../../../../../utils/catchAsync";
import uploadFile from "../../../../../utils/uploadFile";
import generateCode from "../../../../../utils/generateCode";
import * as msg from './dictionary'
import * as model from "../../../model";


const addPlaytecCourseToUser = catchAsync( msg.msgCreateCourse.errorMessage, async ( req, res ) => {
    const { language } = req
    const { course_id } = req.body

    const createdBy = req.user._id
    // validando si existe curso
    const course = await model.UserPlaytecCourse.findOne({course:course_id, user:createdBy})

    if(course){
      return res.status(500).json({
        message:"curso ya adquirido"
      })
    }

    // agregando curso a usuario
    const units = await model.PlaytecCourseUnity.find({course:course_id})
    const sections = await model.PlaytecCourseSection.find()

    // creando nuevo curso para el usuario
    const userCourse = await model.UserPlaytecCourse.create({
      course:course_id,
      user:createdBy  
    })

    // creando unidades para usuario
    const userUnits = await model.UserPlaytecUnity.insertMany(units.map( item => {
      return {
        unity: item._id,
        course:course_id,
        user: createdBy
      }
    }))

    //creando secciones para usuario
    const userSections = await Promise.all( units.map( async unity => {
      return await model.UserPlaytecSection.insertMany(sections.map( (item:any) => {
        if(unity._id.toString() == item.unity.toString()){
          return {
            section:item._id,
            unity:unity._id,
            course:course_id,
            user:createdBy
          }
        }
      }))
    }))

    res.status(200).json({
      message:"agregando data",
      userCourse,
      sections,
      units,
      userSections,
      userUnits
    })   
})

export default addPlaytecCourseToUser