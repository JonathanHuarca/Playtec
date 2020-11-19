import * as model from '../../model'
import catchAsync from '../../../../utils/catchAsync'

const msg = 'Error en el controlador getPost';


const getPostsByUserSaved = catchAsync(msg, async (req, res) => {
  
      const {_id,name} = req.user
      const { page, perPage } = req.body;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        sort: { update: -1 },
        // select:'-_id -user',
        populate:"file"
      };

      let datas = [];

      const post= await model.Postsaved.find({"user": _id}).populate({
        path: 'posts',
        model: 'posts',
        populate: {
          path: 'file',
          model: 'files'
        }
     })

     console.log(post)
      // const post = await model.Postsaved
      // .paginate({user:_id}, options)
      if(!post){

          return res.status(200).json({
          message:`El usuario no tiene post guardados`,
    
        })

      }

      const a = await Promise.all(post.map( async file => {


        let id_user = file['posts']['user'];
        let id_post:String = file['posts']['_id']
        datas.push(id_post);

      if(id_user==_id){
 
        req.body.saved = true;
        req.body.name = name;
        req.body.edit = true;

        let posts1 = await model.Post
        .findByIdAndUpdate( 
            id_post, 
            req.body, 
            {
              new: true
            }
        )
      }else{

        req.body.edit = false;
        req.body.saved = true;

        let posts2 = await model.Post
        .findByIdAndUpdate( 
            id_post, 
            req.body, 
            {
              new: true
            }
        )
      }

      }))

    const posts = await model.Post
    .paginate({_id:datas}, options)

    return res.status(200).json({
    message:`posts guardados del usuario`,
    posts
  })

  })

export default getPostsByUserSaved 