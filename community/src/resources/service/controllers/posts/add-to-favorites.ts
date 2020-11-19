import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'


const messages = {
  errorMessage: {
    es:'Error en el controlador addToFavorite'
  }
}

const addToFavorites = catchAsync(messages.errorMessage, async (req, res) => {
  const {_id,name} = req.user
  const { post_id } = req.body


    const postsaved_id = await model.Postsaved.find({"posts": post_id,"user": _id});

    if(postsaved_id.length==0){

      const newPostSaved = {
       user: _id,
       posts:post_id
      }
      
      const postsaved = await model.Postsaved.create(newPostSaved);
      // const postsaved_id = await model.Postsaved.find({"posts": {$gt: _id}});

      const posts_id = await model.Post.findById(post_id);
     
      if(posts_id['user']==_id){

          req.body.name = name;
          req.body.saved = true;
          req.body.edit =true;
        
          const post = await model.Post
                  .findByIdAndUpdate( 
                      post_id, 
                      req.body, 
                      {
                        new: true
                      }
                  )
                  .lean()
                  .exec()
            
      
          const post_e = await model.Post.findById(post_id).populate("file")
            
          return res.status(200).json({
            message:`Post guardado correctamente`,
            data:post_e
          })

      }else{

          req.body.name = name;
          req.body.saved = true;
          req.body.edit =false;
        
          const post = await model.Post
                  .findByIdAndUpdate( 
                      post_id, 
                      req.body, 
                      {
                        new: true
                      }
                  )
                  .lean()
                  .exec()
            
      
          const post_e = await model.Post.findById(post_id).populate("file")
            
          return res.status(200).json({
            message:`Post guardado correctamente`,
            data:post_e
          })

      }

    }else{

      const posts_id = await model.Post.findById(post_id);
     
      if(posts_id['user']==_id){

          req.body.name = name;
          req.body.saved = true;
          req.body.edit =true;
        
          const post = await model.Post
                  .findByIdAndUpdate( 
                      post_id, 
                      req.body, 
                      {
                        new: true
                      }
                  )
                  .lean()
                  .exec()
            
      
          const post_e = await model.Post.findById(post_id).populate("file")
            
          return res.status(200).json({
            message:`Post guardado correctamente`,
            data:post_e
          })

      }else{

          req.body.name = name;
          req.body.saved = true;
          req.body.edit =false;
        
          const post = await model.Post
                  .findByIdAndUpdate( 
                      post_id, 
                      req.body, 
                      {
                        new: true
                      }
                  )
                  .lean()
                  .exec()
            
          const post_e = await model.Post.findById(post_id).populate("file")
            
          return res.status(200).json({
            message:`Post guardado correctamente`,
            data:post_e
          })

      }
     

    }        

})

export default addToFavorites