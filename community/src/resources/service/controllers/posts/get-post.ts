import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'

const msg = 'Error en el controlador getPost';


const getPost = catchAsync(msg, async (req, res) => {
    const {_id, name} = req.user
    const { post_id } = req.body

    const post = await model.Post.findById(post_id)
    if(!post){

      return res.status(200).json({
      message:`No se encontraron resultados`})
    }
    if(_id==post.user){

      req.body.name = name;
      req.body.edit = true

      const post1 = await model.Post
      .findByIdAndUpdate( 
          post_id, 
          req.body, 
          {
            new: true
          }
      ).populate("file")
      return res.status(200).json({
        message:`post obtenido`,
        data:post1})

    }else{

      req.body.name = name;
      req.body.edit = false
        
      let post2 = await model.Post
      .findByIdAndUpdate( 
          post_id, 
          req.body, 
          {
            new: true
          }
      ).populate("file")

      return res.status(200).json({
        message:`post obtenido`,
        data:post2})

    }

})

export default getPost