import catchAsync from "../../../../../utils/catchAsync";
import uploadFile from "../../../../../utils/uploadFile";
// import generateCode from "../../../../../utils/generateCode";
import * as msg from './dictionary'
import * as model from "../../../model";


const updatePlaytecCourse = catchAsync( msg.msgCreateCourse.errorMessage, async ( req, res ) => {
    const { language } = req
    const { course_id } = req.body
    const createdBy = req.user._id
    
    // console.log("req.files -------", req.files)
    let _course:any = await model.PlaytecCourse.findById(course_id)
    
    if( !_course ){
        return res.status(500).json({
            message:"curso no existe"
        })
    }

    
    let __course:any = await model.PlaytecCourse.findById(course_id).populate({
        path:"certified.image teacher.image images.main images.detail images.modal",
        model:"files"
    })
    // console.log("populate", _course)
    req.body.images = {
        ..._course.images
    }

    req.body.teacher = {
        ..._course.teacher,
        name:req.body.teacher_name,
        // description: req.body.description_teacher
    }

    req.body.certified = {
        ..._course.certified,
        // description:req.body.description_certified
    }
   
    

    // console.log("certified", req.body.certified)
    const files = async ( param, ext , url, id) => {
        const obj = {
            imageTeacher:"teacher",
            imageCertified:"certified",
            imageMain:"images",
            imageDetail:"images",
            imageModal:"images"
        }
        await uploadFile(req, obj[param], param, _course.code, ext, url, id)
    }
    if( req.files ){
        const { imageTeacher,imageCertified,imageMain,imageModal, imageDetail } = req.files
        
        const data = [
            imageTeacher && files( "imageTeacher" , "", _course.teacher.image && __course.teacher.image.url, _course.teacher.image &&  _course.teacher.image._id), 
            imageCertified && files( "imageCertified", "", _course.certified.image && __course.certified.image.url, _course.certified.image && _course.certified.image._id),
            imageMain && files( "imageMain", "main",_course.images.main && __course.images.main.url,_course.images.main && _course.images.main._id),
            imageModal && files( "imageModal", "modal", _course.images.modal && __course.images.modal.url, _course.images.modal && _course.images.modal._id),
            imageDetail && files( "imageDetail", "detail",_course.images.detail && __course.images.detail.url, _course.images.detail && _course.images.detail._id)
        ]
        await Promise.all(data)
    }

    req.body.price = {
        soles:{
            normal:req.body.priceSolesNormal || _course.price.soles.normal,
            offer:req.body.priceSolesOffer || _course.price.soles.offer
        },
        dollar:{
            normal:req.body.priceDollarNormal || _course.price.dollar.normal,
            offer:req.body.priceDollarOffer || _course.price.dollar.offer
        }
    }

    req.body.images = {
        ...req.body.images
    }

    req.body.teacher = {
        ...req.body.teacher,
        name:req.body.teacher_name || _course.teacher.name,
        description: req.body.description_teacher || _course.teacher.description
    }

    req.body.certified = {
        ...req.body.certified,
        description:req.body.description_certified || _course.certified.description
    }

    
    await model.PlaytecCourse.findByIdAndUpdate(course_id,{
        ...req.body,
        createdBy
    },{
        new:true
    })
   
    const oneCourse = await model.PlaytecCourse.findById(course_id)
    .populate({
        path:"certified.image teacher.image images.main images.detail images.modal",
        model:"files"
    })
    res.status(200).json({
        message:msg.msgCreateCourse.success[language],
        course:oneCourse
    })
} )

export default updatePlaytecCourse