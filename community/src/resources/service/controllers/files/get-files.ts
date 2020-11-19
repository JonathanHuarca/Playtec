import catchAsync from "../../../../utils/catchAsync";
import {File, Post, Postsaved} from '../../model'
import AWS from 'aws-sdk';
import moment from 'moment-timezone';

const errorMessage: String = "Error en get all files controller"

const messages = {
   success: {
       es: 'Todos los Archivos encontrados',
       en: 'All files found'
   },
   
   error: {
       es: 'Error al buscar archivos',
       en: 'Failed to find files'
   }
}

const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
  } )


const getAllFiles = catchAsync(errorMessage,async (req, res) => {
   const { language } = req   
//    const {id_files, post_id} = req.body

  const posts = await Postsaved.findByIdAndRemove("5f76480a26b83a1d9fd90cae")
console.log(posts)
//   const files_e = await File.findById(id_files).lean()
  
//     //   let array_id = [];
//     //    const post_file= await Post.findById(post_id).populate("file");
    
//     //    const a = await Promise.all(post_file.file.map( async file => {
//     //    array_id.push(file._id);

//     //     }))

//     //   console.log(array_id)
  

// //    const a = await Promise.all(files.map( async file => {

// //    console.log(file)
// //    const deletefile = await File.findByIdAndRemove(file._id)
//     let id_file = files_e["_id"]
//     let url = files_e["url"]
//     let length = url.length
//     let termino = "files/"; 
//     // para buscar la palabra hacemos
//     let posicion = url.indexOf(termino);
//     let key_file = url.substring(posicion,length);

//     const deleteFile = {
//         Bucket:process.env.BUCKET_NAME,
//         Key: key_file

//     };

//     const data = await s3.deleteObject( deleteFile ).promise()
//     const deletefile = await File.findByIdAndRemove(id_file)

//  }))
     

      // let fecha = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
      // console.log(fecha)



        res.status(200).json({
        message : "hola",
        
  })
   
})

export default getAllFiles 