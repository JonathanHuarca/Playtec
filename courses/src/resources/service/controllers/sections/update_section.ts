import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";
import moment from 'moment-timezone'

import AWS from 'aws-sdk'

const messages = {
    success: {
        es: 'Sección actualizado',
        en: 'Section updated'
    },
    error: {
        es: 'No se encontró la sección',
        en: 'Section not found'
    },
    errorMessage: 'Error en updateSection controller'
}

// const s3 = new AWS.S3( {
//     accessKeyId: process.env.ID,
//     secretAccessKey: process.env.SECRET
// } )

const updateSection = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { section_id } = req.body

    // Actualización de archivos
    // if ( req.files ) {

    //     const time = moment().format( 'DD-MM-YYYY-HH:mm:ss' )
    //     const files = req.files.documents

    //     if ( files.lenght >= 2 ) {

    //         files.map( async ( file: any ) => {

    //             let fileToUpload = {
    //                 Bucket: `${process.env.BUCKET_NAME}/coursesp/content/${req.body.unity}`,
    //                 Key: `${file.name.trim()}${time}`, // Nombre del archivo que se guardará en S3
    //                 Body: file.data,
    //                 ACL: 'public-read'
    //             }

    //             const data = await s3.upload( fileToUpload ).promise()

    //             const fileData = {
    //                 name: file.name,
    //                 url: data.Location
    //             }

    //             req.body.files.push( fileData )

    //         } )

    //     } else {
    //         let fileToUpload = {
    //             Bucket: `${process.env.BUCKET_NAME}/coursesp/content/${req.body.unity}`,
    //             Key: `${files.name.trim()}${time}`, // Nombre del archivo que se guardará en S3
    //             Body: files.data,
    //             ACL: 'public-read'
    //         }

    //         const data = await s3.upload( fileToUpload ).promise()

    //         req.body.files.push( data.Location )
    //     }

    // }

    const section = await model.PlaytecCourseSection
        .findByIdAndUpdate(
            section_id,
            req.body,
            { new: true }
        )
        .lean()
        .exec()

    res.status( 200 ).json( {
        message: messages.success[ language ],
        section
    } )

} )

export default updateSection