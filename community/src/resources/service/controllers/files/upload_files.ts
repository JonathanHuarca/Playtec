import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";
// import * as dotenv from "dotenv";

// dotenv.config({ path: __dirname+'/.env' });

import AWS from 'aws-sdk';
// import { await } from "signale";
// import { type } from "os";

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

// const ID = process.env.ID
// const SECRET = process.env.SECRET

const s3 = new AWS.S3( {
    
    accessKeyId :'AKIAJLBSNZXK3CNZQHAQ',
    secretAccessKey:'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'
})



const uploadFiles = catchAsync( messages.errorMessage, async ( req, res, next ) => {

    const { language } = req
    // const { id_user } = req.body.id_user || req.user._id

    // Preparación del archivo para subida
   
    //mimetipe indica que tipo de documento es
    //Realizar un mapeo
    //Funciones , promesas
    //Editar, Eliminar.
    let datas = [];
    if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
    }

  
    // Subida de archivo
    else{


        for (var i in req.files.files) {
            const file = req.files.files[i];
            
            //move photo to uploads directory
            // photo.mv('./uploads/' + photo.name);

            //push file details
            const fileToUpload = {

                Bucket: 'playtecacademy/files',
                Key: file.name, // Nombre del archivo que se guardará en S3
                Body: file.data, //archivos a subir
                ACL: 'public-read' //

            }

            const data = await s3.upload( fileToUpload ).promise()

            const newFile = await model.File.create( {
                filename: file.name,
                url: data.Location,
                type: file.mimetype
                // type: namefile
            })

            datas.push({
                id_files: newFile._id,
                filename: file.name,
                url: data.Location,
                type: file.mimetype
            });

        };

        res.status( 200 ).json({
            message: messages.success[ language ],
            data:datas
        })

    }

   

    // let filename =file.name;
    // function getFileExtension1(filename) {
    //     return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    // }

    // let namefile = getFileExtension1(filename);
    
   

} )

export default uploadFiles