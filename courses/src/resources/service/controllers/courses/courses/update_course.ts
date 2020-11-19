import catchAsync from "../../../../../utils/catchAsync";
import * as model from '../../../model'

import AWS from 'aws-sdk'
import moment from 'moment-timezone'

const messages = {
    success: {
        es: 'Curso actualizado',
        en: 'Course updated'
    },
    error: {
        es: 'Curso no encontrado',
        en: 'Course not found'
    },
    errorMessage: "Error en updateCourse controller"
}

const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
} )

const updateCourse = catchAsync( messages.errorMessage, async ( req, res, next ) => {

    const { language } = req

    const { course_id: _id } = req.body
    let any_code = ''

    let course: any = await model.Course
        .findById( _id )
        .lean()
        .exec()

    if ( !course ) {
        res.status( 200 ).json( { message: messages.error[ language ] } )
    }

    // Generar código de clase
    const generateCode = async ( cod ) => {
        const abc = 'abcdefghijklmnpqrstuvwxyz123456789'
        let courseExists

        while ( cod.length !== 15 ) {
            const number = Math.floor( Math.random() * abc.length )
            const letter = abc.split( '' )[ number ]
            cod = cod + letter

        }
        courseExists = await model.Course.findOne( { temporary_code: cod } )

        if ( courseExists ) {
            generateCode( cod )
        }

        return cod
    }


    if ( req.body.make === 'changeCode' ) {
        req.body.temporary_code = await generateCode( any_code )
    }

    // Verificar si está actualizando imagen
    if ( req.files ) {

        // 1° Eliminar del Bucket la imagen anterior
        const key = course.image_url.split( '.com/' )[ 1 ]

        const fileToDelete = {
            Bucket: process.env.BUCKET_NAME,
            Key: key
        }

        await s3.deleteObject( fileToDelete ).promise()

        // 2° Subir nueva imagen
        const file = req.files.img
        const time = moment().tz( 'America/Lima' ).format( 'DD/MM/YYYY-HH:mm:ss' )

        const fileToUpload = {
            Bucket: `${process.env.BUCKET_NAME}/courses/imgs/`,
            Key: `${file.name.trim()}${time}`, // Nombre del archivo que se guardará en S3
            Body: file.data,
            ACL: 'public-read'
        }

        const data = await s3.upload( fileToUpload ).promise()

        req.body.image_url = data.Location

    }


    course = await model.Course
        .findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        .lean()
        .exec()

    res.status( 200 ).json( {
        message: messages.success[ language ],
        course: course
    } )
} )

export default updateCourse