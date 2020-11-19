import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';

const messages = {
  errorMessage: {
    es:'Error en el controlador updatePost'
  }
}

const s3 = new AWS.S3( {
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
} )


const updatePost = catchAsync(messages.errorMessage, async (req, res) => {

  const { _id,name} = req.user
  const { post_id,description,id_files } = req.body


  let datas = [];

  if(!post_id){
      return res.status(200).json({
      message:`Ingresa el id del Post para realizar la busqueda`})
  }
  else{

    try {

      const id_user= await model.Post.findById(post_id).populate("file");

      if(id_user==null){
      
        return res.status(200).json({
        message:`el post que se quiere actualizar no existe`})
    
      }if(id_user.user==_id){
    
              if(id_user.file.length==0) {
    
                if(req.files == null) {
                  req.body.name = name;
                  req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                  req.body.edit = true;
                  req.body.description= description;
                  const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true })
                  const post_e = await model.Post.findById(post._id).populate("file")
                  return res.status(200).json({
                  message:`post actualizado correctamente`,
                  data:post_e}) 

                }
                // SUBIDA DE UN ARCHIVO EN CASO NO TENGA ARCHIVOS
                
                if(req.files.files[0]==undefined){
              
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
                    req.body.user = _id
                    req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                    req.body.edit = true;
                    req.body.description = description;
                    req.body.file = newFile._id;
              
                    const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                    const post_e = await model.Post.findById(post._id).populate("file")
              
                    return res.status(200).json({
                    message:`Post actualizado correctamente`,
                    data:post_e})
                   
                }
              
                else{
              
                    // SUBIDA DE UN ARCHIVOS EN CASO NO TENGA ARCHIVOS
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
                        req.body.user = _id
                        req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                        req.body.edit = true;
                        req.body.description = description;
                        req.body.file = datas;
                  
                        const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                        const post_e = await model.Post.findById(post._id).populate("file")
                  
                        return res.status(200).json({
                        message:`Post actualizado correctamente`,
                        data:post_e})
    
                }
                
              }else{
    
                  // ACTUALIZACION  DE UN POST CUANDO YA CUENTA CON ARCHIVOS
    
                    if(!id_files){
    
                      if(req.files == null) {
                        req.body.name = name;
                        req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                        req.body.edit = true;
                        req.body.description= description;
                        const post = await model.Post.findByIdAndUpdate( post_id, req.body,{ new: true,})
                        const post_e = await model.Post.findById(post._id).populate("file")
                        return res.status(200).json({
                        message:`post actualizado correctamente`,
                        data:post_e}) 
                      }
                      // Subida de archivo
                      
                      if(req.files.files[0]==undefined){
                    
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
                          const post_file= await model.Post.findById(post_id).populate("file");
                             
                          const c = await Promise.all(post_file.file.map( async file => {
                          datas.push(file._id);
                   
                           }))
                          
                          req.body.name = name;
                          datas.push(newFile._id);
                          req.body.user = _id
                          req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                          req.body.edit = true;
                          req.body.description = description;
                          req.body.file = datas;
                    
                          const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                          const post_e = await model.Post.findById(post._id).populate("file")
                    
                          return res.status(200).json({
                          message:`Post actualizado correctamente`,
                          data:post_e})
                        
                      }
                    
                      else{
    
    //                      SUBIENDO Y CREANDO ARCHIVOS
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
                        
                              const post_file= await model.Post.findById(post_id).populate("file");
                             
                              const c = await Promise.all(post_file.file.map( async file => {
                              datas.push(file._id);
                       
                               }))

                              req.body.name = name;
                              req.body.user = _id
                              req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                              req.body.edit = true;
                              req.body.description = description;
                              req.body.file = datas;
                        
                              const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                              const post_e = await model.Post.findById(post._id).populate("file")
                        
                              return res.status(200).json({
                              message:`Post actualizado correctamente`,
                              data:post_e})
                      }
    
                    }else{
    
    //                   EN CASO HAYA ARCHIVOS A ELIMINAR PERO NO HAYA SUBIDA DE ARCHIVOS
    
                            if(req.files == null) {
    
    
                                if(Array.isArray(id_files)){
    
                                //ELIMINANDO ARCHIVOS SELECCIONADOS
    
                                    const a = await Promise.all(id_files.map( async file => {
    
                                      const files_e = await model.File.findById(file).lean()
                                      let url = files_e['url']
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
                                      const deletefile = await model.File.findByIdAndRemove(file)
                                  
                                    
                                    }))

                                    req.body.name = name;
                                    req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                                    req.body.edit = true;
                                    req.body.description= description;
                                    const post = await model.Post.findByIdAndUpdate( post_id, req.body,{ new: true,})
                                    const post_e = await model.Post.findById(post._id).populate("file")
                                    return res.status(200).json({
                                    message:`post actualizado correctamente`,
                                    data:post_e
                                  }) 
                                
                              }
                              else{
                                    let array = [];
                                    array.push(id_files);
                                    console.log(array)
    
                                    //ELIMINANDO ARCHIVO SELECCIONADO
    
                                    const a = await Promise.all(array.map( async file => {
    
                                      const files_e = await model.File.findById(file).lean()
                                      let url = files_e['url']
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
                                      const deletefile = await model.File.findByIdAndRemove(file)
                                  
                                    
                                    }))
    
                                    req.body.name = name;
                                    req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss")
                                    req.body.edit = true;
                                    req.body.description= description;
                                    const post = await model.Post.findByIdAndUpdate( post_id, req.body,{ new: true,})
                                    const post_e = await model.Post.findById(post._id).populate("file")
                                    return res.status(200).json({
                                    message:`post actualizado correctamente`,
                                    data:post_e
                                  }) 
    
                              }
    
                            }
                 
    //                   EN CASO HAYA ARCHIVOS A ELIMINAR Y HAYA SUBIDA DE UN ARCHIVO
                            if(req.files.files[0]==undefined){
    
                              if(Array.isArray(id_files)){
    
                              const a = await Promise.all(id_files.map( async file => {
    
                                const files_e = await model.File.findById(file).lean()
                                let url = files_e['url']
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
                                const deletefile = await model.File.findByIdAndRemove(file)
                                
                              }))
    
    
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
                                
                                
                                const post_file= await model.Post.findById(post_id).populate("file");
                             
                                const c = await Promise.all(post_file.file.map( async file => {
                                datas.push(file._id);
                         
                                 }))

                                req.body.name = name;
                                datas.push(newFile._id);
                                req.body.user = _id;
                                req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
                                req.body.edit = true;
                                req.body.description = description;
                                req.body.file = datas;
    
                                const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                                const post_e = await model.Post.findById(post._id).populate("file")
    
                                return res.status(200).json({
                                message:`Post actualizado correctamente`,
                                data:post_e})
    
                              }else{
    
                                let array = [];
                                array.push(id_files);
    
    
                                const a = await Promise.all(array.map( async file => {
    
                                 
                                  const files_e = await model.File.findById(file).lean()
                                  let url = files_e['url']
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
                                  const deletefile = await model.File.findByIdAndRemove(file)
                                  
                                }))
      
      
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
    
                                  const post_file= await model.Post.findById(post_id).populate("file");
                             
                                  const c = await Promise.all(post_file.file.map( async file => {
                                  datas.push(file._id);
                                   }))
      
                                  datas.push(newFile._id);
                                  req.body.name = name;
                                  req.body.user = _id;
                                  req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
                                  req.body.edit = true;
                                  req.body.description = description;
                                  req.body.file = datas;
      
                                  const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                                  const post_e = await model.Post.findById(post._id).populate("file")
      
                                  return res.status(200).json({
                                  message:`Post actualizado correctamente`,
                                  data:post_e})
    
                              }

                              
                            }
    
    //                           EN CASO HAYA ARCHIVOS A ELIMINAR Y HAYA SUBIDA DE VARIOS ARCHIVOS
    
                            else{
    
    
                               if(Array.isArray(id_files)){
    
                                const b = await Promise.all(id_files.map( async file => {
    
                                  const files_e = await model.File.findById(file).lean()
                                  let url = files_e['url']
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
                                  const deletefile = await model.File.findByIdAndRemove(file)
                                  
                                }))
                                 
                              //               SUBIENDO Y CREANDO ARCHIVOS
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
    
                                      const post_file= await model.Post.findById(post_id).populate("file");
                             
                                      const c = await Promise.all(post_file.file.map( async file => {
                                      datas.push(file._id);
                               
                                       }))
                                
                                      req.body.name = name;
                                      req.body.user = _id;
                                      req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
                                      req.body.edit = true;
                                      req.body.description = description;
                                      req.body.file = datas;
                                
                                      const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                                      const post_e = await model.Post.findById(post._id).populate("file")
                                
                                      return res.status(200).json({
                                      message:`Post actualizado correctamente`,
                                      data:post_e})
    
                               }else{
    
                                    let array = [];
                                    array.push(id_files);
                                    console.log(array)
    
    
                                    const b = await Promise.all(array.map( async file => {
    
                                      const files_e = await model.File.findById(file).lean()
                                      let url = files_e['url']
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
                                      const deletefile = await model.File.findByIdAndRemove(file)
                                      
                                    }))
                                 
                              //               SUBIENDO Y CREANDO ARCHIVOS
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
                                
                                      const post_file= await model.Post.findById(post_id).populate("file");
                             
                                      const c = await Promise.all(post_file.file.map( async file => {
                                      datas.push(file._id);
                               
                                       }))

                                      req.body.name = name;
                                      req.body.user = _id;
                                      req.body.update = moment().tz("America/Lima").format("YYYY-MM-DD , HH:mm:ss");
                                      req.body.edit = true;
                                      req.body.description = description;
                                      req.body.file = datas;
                                
                                      const post = await model.Post.findByIdAndUpdate( post_id, req.body,  {new: true})
                                      const post_e = await model.Post.findById(post._id).populate("file")
                                
                                      return res.status(200).json({
                                      message:`Post actualizado correctamente`,
                                      data:post_e})
    
                               }
    
                            }
                            
                    }
    
              }
    
       }else{
          return res.status(500).json({
          message:`Este post no se pudo actualizar por que no le pertenece`})
      }

    } catch (Exception ) {

      return res.status(500).json({
      message:`El id de Post o el id de files no existe`})

    }  
  } 
})

export default updatePost