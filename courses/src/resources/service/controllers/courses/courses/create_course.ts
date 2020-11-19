import catchAsync from "../../../../../utils/catchAsync";
import * as model from '../../../model'
import * as msg from './dictionary'

import AWS from 'aws-sdk'
import moment from 'moment-timezone'

const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
} )

const createCourse = catchAsync( msg.msgCreateCourse.errorMessage, async ( req, res ) => {

    const { language } = req
    const { _id: createdBy, username } = req.user
    let any_code: String = ''

    // Generar código de clase
    const generateCode = async ( codeType, cod ) => {
        const abc = 'abcdefghijklmnpqrstuvwxyz123456789'
        let courseExists

        if ( codeType === 'code' ) {
            while ( cod.length !== 9 ) {
                const number = Math.floor( Math.random() * abc.length )
                const letter = abc.split( '' )[ number ]
                cod = cod + letter
            }
            courseExists = await model.Course.findOne( { code: cod } )
        } else if ( codeType === 'codeTemp' ) {
            while ( cod.length !== 15 ) {
                const number = Math.floor( Math.random() * abc.length )
                const letter = abc.split( '' )[ number ]
                cod = cod + letter

            }
            courseExists = await model.Course.findOne( { temporary_code: cod } )
        }

        if ( courseExists ) {
            generateCode( codeType, cod )
        }

        return cod
    }

    req.body.code = await generateCode( 'code', any_code )

    req.body.temporary_code = await generateCode( 'codeTemp', any_code )

    // Verificar si está subiendo imagen
    if ( req.files ) {

        // Subida de archivo
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

    const course = await model.Course.create( {
        ...req.body,
        createdBy
    } )

    res.status( 200 ).json( {
        message: msg.msgCreateCourse.success[ language ] + username,
        course
    } )
} )

export default createCourse