import catchAsync from '../../../../utils/catchAsync'
import * as model from '../../model'
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';

const msg = 'Error en el controlador createPost'

const s3 = new AWS.S3( {
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
} )

// console.log( process.env.ID)
// console.log(process.env.SECRET)
const createPost = catchAsync(msg, async (req, res, next) => {

  const { _id, name} = req.user
  const {description} = req.body
  // const { id_user } = req.body.id_user || req.user._id
  // Preparación del archivo para subida
  //mimetipe indica que tipo de documento es
  //Realizar un mapeo
  //Funciones , promesas
  //Editar, Eliminar.

  let datas = [];
 
  if(!req.files) {

    req.body.name = name
    req.body.user = _id
    req.body.create = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
    req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
    req.body.edit = true;
    req.body.description = description;

    const post = await model.Post.create(req.body)
    const post_e = await model.Post.findById(post._id).populate("file")

  
    return res.status(200).json({
    message:`Post creado correctamente`,
    data:post_e})
   
  }
  // Subida de archivo
  
  if(!req.files.files[0]){

      const file = req.files.files
      const renamefile = uuidv4();
      const name_file = file.name
      const name_new = name_file.split(" ").join("-");
      const fileToUpload = {

      Bucket: `${process.env.BUCKET_NAME}/files`,
      Key: `${renamefile}.${name_new}`, // Nombre del archivo que se guardará en S3
      Body: file.data, //archivos a subir
      ACL: 'public-read' //
      
  }

      const data = await s3.upload( fileToUpload ).promise()
      const newFile = await model.File.create( {
          filename: name_new,
          url: data.Location,
          type: file.mimetype
          // type: namefile
      })

      req.body.name = name;
      req.body.user = _id;
      req.body.create = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
      req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
      req.body.edit = true;
      req.body.description = description;
      req.body.file = newFile._id;

      const post = await model.Post.create(req.body)
      const post_e = await model.Post.findById(post._id).populate("file")

   
      return res.status(200).json({
      message:`Post creado correctamente`,
      data:post_e})
      

  }

  else{
         
         const a = await Promise.all(req.files.files.map( async file => {

         const name_file = file.name
         const name_new = name_file.split(" ").join("-");
         const renamefile = uuidv4();
         const fileToUpload = {

          Bucket: `${process.env.BUCKET_NAME}/files`,
          Key: `${renamefile}.${name_new}`, // Nombre del archivo que se guardará en S3
          Body: file.data, //archivos a subir
          ACL: 'public-read' //

      }

      const data = await s3.upload( fileToUpload ).promise()

      const newFile = await model.File.create( {
          filename: name_new,
          url: data.Location,
          type: file.mimetype
          // type: namefile
      })
      datas.push(newFile._id);
      }))

      req.body.name = name;
      req.body.user = _id;
      req.body.create = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
      req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
      req.body.edit = true;
      req.body.description = description;
      req.body.file = datas;

      const post = await model.Post.create(req.body)
      const post_e = await model.Post.findById(post._id).populate("file")

  
      return res.status(200).json({
      message:`Post creado correctamente`,
      data:post_e})

  }
  
})

export default createPost