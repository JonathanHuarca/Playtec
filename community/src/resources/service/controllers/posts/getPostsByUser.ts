import {Post} from '../../model'
import catchAsync from '../../../../utils/catchAsync'

const msg = 'Error en el controlador getPost';


const getPostsByUser = catchAsync(msg, async (req, res) => {
  
    const {_id, name} = req.user
    const { page, perPage } = req.body;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        sort: { update: -1 },
        select:'-likes -views',
        populate:"file"
      };

      const postusers = await Post
      .paginate({user:_id},options)
      
      for (var i in postusers.data) {

       let id_post:String = postusers.data[i]['_id']
       
          req.body.name = name;
          req.body.edit = true;
  
          let posts1 = await Post
          .findByIdAndUpdate( 
              id_post, 
              req.body, 
              {
                new: true
              }
          )
    }

    
    const posts = await Post
    .paginate({user:_id}, options)
    
    
    return res.status(200).json({
    message:`Posts obtenidos del usuario`,
    posts})
    
})

export default getPostsByUser 