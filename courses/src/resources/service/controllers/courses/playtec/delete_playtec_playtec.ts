import catchAsync from "../../../../../utils/catchAsync"
import * as model from '../../../model';

import AWS from 'aws-sdk'

const messages = {
    success: {
        es: 'Curso eliminado',
        en: 'Course deleted'
    },
    error: {
        es: 'Error al eliminar',
        en: 'Delete failed'
    },
    errorMessage: "Error en deleteCoursePlaytec controller"
}

// Parámetros para bucket S3
const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
})

const deletePlaytecCourse = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { course_id } = req.body
    const course:any = await model.PlaytecCourse.findById(course_id)

    if(!course){
        res.status(500).json({
            message:"Curso no existe"
        })
    }
    
    await model.PlaytecCourse.findByIdAndRemove(course_id)
    
    res.status(200).json({
        message:`curso eliminado ${course.code.toUpperCase()}` ,
        course:course
    })
})

export default deletePlaytecCourse