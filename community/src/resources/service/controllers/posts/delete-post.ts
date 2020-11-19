import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'
import AWS from 'aws-sdk';

const messages = {
  errorMessage: {
    es:'Error en el controlador deletePost'
  }
}

const s3 = new AWS.S3( {
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
} )

const deletePost = catchAsync(messages.errorMessage, async (req, res) => {
  const { _id } = req.user
  const { post_id } = req.body

  const id_user= await model.Post.findById(post_id).populate("file");

   if(!id_user){

     return res.status(200).json({
      message:`el post que se quiere eliminar no existe`})
   }

  if(id_user.user==_id){

        if(id_user.file.length==0) {

            
            const postsaved_id = await model.Postsaved.find({"posts":post_id});
            const a = await Promise.all(postsaved_id.map( async file => {
              const posts = await model.Postsaved.findByIdAndRemove(file['_id'])
              
            }))

            const post = await model.Post.findByIdAndRemove(post_id)
            return res.status(200).json({
            message:`Post eliminado correctamente`,
            delete: true

          })

        }else{

            const a = await Promise.all(id_user.file.map( async file => {

            let id_file = file["_id"]
            let url = file["url"]
            let length = url.length
            let termino = "files/"; 
            // para buscar la palabra hacemos
            let posicion = url.indexOf(termino);
            let key_file = url.substring(posicion,length);
          
            const deleteFile = {
                Bucket:process.env.BUCKET_NAME,
                Key: key_file
            };
          
            const data = await s3.deleteObject( deleteFile ).promise()
            const deletefile = await model.File.findByIdAndRemove(id_file)
       
          }))

            const postsaved_id = await model.Postsaved.find({"posts":post_id});
            const p = await Promise.all(postsaved_id.map( async file => {
              const posts = await model.Postsaved.findByIdAndRemove(file['_id'])
              
            }))

            const post = await model.Post.findByIdAndRemove(post_id)
            return res.status(200).json({
            message:`Post eliminado correctamente`,
            delete: true})
      
        }
  
  }else{
     return res.status(200).json({
     message:`Este post no se pudo eliminar por que no le pertenece`,
     delete: false})
  }

})


export default deletePost

