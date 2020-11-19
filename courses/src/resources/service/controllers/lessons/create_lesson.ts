import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

import AWS from 'aws-sdk'
import moment from 'moment-timezone'

const messages = {
   success: {
      es: 'Clase creada correctamente',
      en: 'Class created successfully'
   },
   error: {
      es: 'Error al crear clase',
      en: 'Class creation failed'
   },
   errorMessage: "Error en createLesson controller"
}

const s3 = new AWS.S3( {
   accessKeyId: process.env.ID,
   secretAccessKey: process.env.SECRET
} )

const createLesson = catchAsync( messages.errorMessage, async ( req, res ) => {
   const { language } = req
   /**
    * generar código de curso
    */
   const generateCode = async () => {
      const abc = 'abcdefghijklmnpqrstuvwxyz123456789'
      let code = ''

      while ( code.length !== 9 ) {
         const number = Math.floor( Math.random() * abc.length )
         const letter = abc.split( '' )[ number ]
         code = code + letter
      }

      const lessonExists = await model.lessonModel.findOne( { code: code } )

      if ( lessonExists ) {
         generateCode()
      }
      return code
   }

   // Verificando si existe archivo en request
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

   req.body.code = await generateCode()

   const lesson = await model.lessonModel.create( req.body )

   res.status( 200 ).json( {
      message: messages.success[ language ],
      lesson
   } )
} )

export default createLesson