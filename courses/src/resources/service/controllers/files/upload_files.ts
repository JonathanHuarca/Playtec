import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

import AWS from 'aws-sdk';

const messages = {
    success: {
        es: 'Archivo subido correctamente',
        en: 'File uploaded correctly'
    },
    error: {
        es: 'Error al subir boucher',
        en: 'Failed to upload file'
    },
    errorMessage: 'Error en uploadFile controller'
}

const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
} )

const uploadFiles = catchAsync( messages.errorMessage, async ( req, res, next ) => {

    const { language } = req
    const { id_user } = req.body.id_user || req.user._id

    // Preparación del archivo para subida
    const file = req.files.files

    // Subida de archivo
    const fileToUpload = {
        Bucket: `${process.env.BUCKET_NAME}/boucher/`,
        Key: file.name, // Nombre del archivo que se guardará en S3
        Body: file.data,
        ACL: 'public-read'
    }

    const data = await s3.upload( fileToUpload ).promise()

    const newFile = await model.Boucher.create( {
        name: file.name,
        url: data.Location,
        ...req.body,
        id_user
    } )

    res.status( 200 ).json( {
        message: messages.success[ language ],
        newFile
    } )
} )

export default uploadFiles