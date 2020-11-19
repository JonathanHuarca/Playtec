import moment from 'moment-timezone';
import AWS from 'aws-sdk'
import * as model from '../resources/service/model'

const s3 = new AWS.S3( {
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
})



const uploadFile = async ( req, value, prop, code, ext, url, id ) => {

  // ========== Delete files s3 ==========================
  // ========================================
  const time = moment().format( 'DD-MM-YYYY-HH:mm:ss' )
  const key = `${time}-${req.files[prop].name.trim()}`
  const body = req.files[prop].data
  const fileToUpload = {
      Bucket: `${process.env.BUCKET_NAME}/coursesp/${code}`,
      Key: key,
      Body: body,
      ContentDisposition:"inline",
      ACL: 'public-read'
  }

  // file == url de imagen o documento ===============
  
  const data = await s3.upload( fileToUpload ).promise()    
  
  if( data && data.Location ){
      const file = await model.Files.create({
          name:req.files[prop].name,
          type:req.files[prop].mimetype,
          url: data.Location
      })
      
      let obj = req.body[value] || {}
      if(value === "images"){
        obj[ext] = file._id
        req.body[value] = obj
      } else {
        obj = {
          image: file._id
        }
      }   

      if(url){
        const deleteKey = url.split('.com/')[ 1 ]
    
        const fileToDelete = {
            Bucket: process.env.BUCKET_NAME,
            Key: deleteKey
        }
        await s3.deleteObject( fileToDelete ).promise()
      }

      return req.body[value] = obj
  }

  // funciona bien
  
  // ===================================================
}

export default uploadFile