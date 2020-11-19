import catchAsync from "../../../../utils/catchAsync";
import * as model from '../../model'

import AWS from 'aws-sdk'
import moment from 'moment-timezone'

const messages = {
    success: {
        es: 'Clase actualizada correctamente',
        en: 'Lesson updated successfully'
    },
    error: {
        es: 'Error al actualizar clases',
        en: 'Failed to update lesson'
    },
    notFound: {
        es: 'Clase no encontrada',
        en: 'Lesson not found '
    },
    errorMessage: "Error en updateLesson controller"
}

const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
} )

const updateLesson = catchAsync( messages.errorMessage, async ( req, res, next ) => {
    const { language } = req

    const { lesson_id: _id } = req.body

    let lesson: any = await model.lessonModel
        .findById( _id )
        .lean()
        .exec()

    if ( !lesson ) {
        return res.status( 400 ).json( {
            message: messages.notFound[ language ]
        } )
    }

    const generateCode = async () => {
        const abc = 'abcdefghijklmnpqrstuvwxyz123456789'
        let codeTemp = ''

        while ( codeTemp.length !== 15 ) {
            const number = Math.floor( Math.random() * abc.length )
            const letter = abc.split( '' )[ number ]
            codeTemp = codeTemp + letter
        }

        const lessonExists = await model.lessonModel.findOne( { codeTemp: codeTemp } )

        if ( lessonExists ) {
            generateCode()
        }
        return codeTemp
    }

    // Verificar si está actualizando imagen
    if ( req.files ) {

        // 1° Eliminar del Bucket la imagen anterior
        const key = lesson.image_url.split( '.com/' )[ 1 ]

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

    // if ( req.body.make === 'code' ) {
    //     req.body.temporary_code = await generateCode()
    // }

    lesson = await model.lessonModel
        .findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        .lean()
        .exec()

    res.status( 200 ).json( {
        message: messages.success[ language ],
        lesson
    } )

} )

export default updateLesson