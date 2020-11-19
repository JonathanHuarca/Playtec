import catchAsync from "../../../../../utils/catchAsync";
import uploadFile from "../../../../../utils/uploadFile";
import generateCode from "../../../../../utils/generateCode";
import * as msg from './dictionary'
import * as model from "../../../model";


const createCoursePlaytec = catchAsync( msg.msgCreateCourse.errorMessage, async ( req, res ) => {
    const { language } = req
    const createdBy = req.user._id

    req.body.code = await generateCode( model.PlaytecCourse )

    
    req.body.price = {
        soles:{
            normal:req.body.priceSolesNormal || 0,
            offer:req.body.priceSolesOffer || 0
        },
        dollar:{
            normal:req.body.priceDollarNormal || 0,
            offer:req.body.priceDollarOffer || 0
        }
    }

    

    const files = async ( param, ext, param2 ) => {
        const obj = {
            imageTeacher:"teacher",
            imageCertified:"certified",
            imageMain:"images",
            imageDetail:"images",
            imageModal:"images"
        }
        await uploadFile(req, obj[param], param, req.body.code, ext, "", "")
    }
    if( req.files ){
        const { imageTeacher,imageCertified,imageMain,imageModal, imageDetail } = req.files
        
        const data = [
            imageTeacher && files( "imageTeacher" , "", ""), 
            imageCertified && files( "imageCertified", "", "" ),
            imageMain && files( "imageMain", "main","" ),
            imageModal && files( "imageModal", "modal","" ),
            imageDetail && files( "imageDetail", "detail" ,"")
        ]
        await Promise.all(data)
    }

    req.body.images = {
        ...req.body.images
    }

    req.body.teacher = {
        ...req.body.teacher,
        name:req.body.teacher_name || '',
        description: req.body.description_teacher
    }

    req.body.certified = {
        ...req.body.certified,
        description:req.body.description_certified || ''
    }

    
    const course = await model.PlaytecCourse.create({
        ...req.body,
        createdBy
    })

    const oneCourse = await model.PlaytecCourse.findById(course._id).populate({
        path:"teacher.image images.main images.detail images.modal",
        model:"files"
    })
    res.status(200).json({
        message:msg.msgCreateCourse.success[language],
        course:oneCourse
    })
} )

export default createCoursePlaytec