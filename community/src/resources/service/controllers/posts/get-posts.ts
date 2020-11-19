import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'

const msg = 'Error en el controlador getPosts'

const getPosts = catchAsync(msg ,async (req, res) => {
 
  const {_id, name} = req.user

  const { page, perPage } = req.body;
  const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        sort: { update: -1 },
        populate:"file",
        select:'-likes -views' 
      };

    const postusers = await model.Post
      .paginate({},options)

      const a = await Promise.all(postusers.data.map( async file => {
            
       let id_user = file['user']
       let id_post =file['_id']
       let id_string = id_post.toString()
      //  let id_string = JSON.stringify(file['_id']) 
      //  console.log(typeof(id_string))


        if(id_user==_id){

          console.log("miralo pes")
            const postsaved_id = await model.Postsaved.find({"user": _id})

            for (var i = 0; i < postsaved_id.length; i++){

            let post_saved = postsaved_id[i]['posts']

            if( id_string===post_saved.toString()){

          

              // console.log(JSON.stringify(file['posts']))
              req.body.name = name;
              req.body.edit = true;
              req.body.saved = true;
        
              let posts1 = await model.Post
              .findByIdAndUpdate( 
                  id_post, 
                  req.body, 
                  {
                    new: true
                  }
              )
              break;

            }else{
           
           
              // console.log(typeof(post_saved) )
              // console.log(JSON.stringify(file['posts']))
              req.body.name = name;
              req.body.edit = true;
              req.body.saved = false;
        
              let posts1 = await model.Post
              .findByIdAndUpdate( 
                  id_post, 
                  req.body, 
                  {
                    new: true
                  }
              )
            }
            }


        }else{
       
          const postsaved_id = await model.Postsaved.find({"user": _id})

        
          if(!postsaved_id.length){
  
            req.body.edit = false;
            req.body.saved = false;
      
            let posts1 = await model.Post
            .findByIdAndUpdate( 
                id_post, 
                req.body, 
                {
                  new: true
                }
            )

          }else{

            for (var i = 0; i < postsaved_id.length; i++){

              let post_saved = postsaved_id[i]['posts']
  
                if( id_string===post_saved.toString()){
  
                  req.body.edit = false;
                  req.body.saved = true;
            
                  let posts1 = await model.Post
                  .findByIdAndUpdate( 
                      id_post, 
                      req.body, 
                      {
                        new: true
                      }
                  )
                  break;
  
                }else{
              
                  req.body.edit = false;
                  req.body.saved = false;
            
                  let posts1 = await model.Post
                  .findByIdAndUpdate( 
                      id_post, 
                      req.body, 
                      {
                        new: true
                      }
                  )
                }
              }

          }

        }
        
      }))

    const postsusers = await model.Post
    .paginate({},options)
    return res.status(200).json({
    message:`obtenciòn de todos los posts`,
    postsusers})
    
  
})

export default getPosts