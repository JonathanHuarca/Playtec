import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

import AWS from 'aws-sdk'

const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
} )

const messages = {
    success: {
        es: 'Archivo eliminado',
        en: 'Document deleted'
    },
    errorMessage: 'Error en updateFilesContent controller'
}

const updateFilesContent = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { section_id, key } = req.body

    const section: any = await model.PlaytecCourseSection
        .findById( section_id )
        .lean()
        .exec()

    if ( !section )
        return res.json( { message: 'No se encontró la sección' } )

    section.files.map( async file => {

        if ( file === key ) {

            const deleteKey = key.split( '.com/' )[ 1 ]

            // Parámetros para eliminar el archivo del Bucket
            const fileToDelete = {
                Bucket: process.env.BUCKET_NAME,
                Key: deleteKey
            }

            await s3.deleteObject( fileToDelete ).promise()

        }

    } )

    res.json( {
        message: messages.success[ language ]
    } )

} )

export default updateFilesContent