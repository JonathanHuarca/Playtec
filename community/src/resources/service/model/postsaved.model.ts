import { Schema, model } from 'mongoose';
import { mongoosePagination } from "ts-mongoose-pagination";

const PostsavedSchema = new Schema({
  
    user:Schema.Types.ObjectId,
    posts:{
      type: Schema.Types.ObjectId,
      ref: 'posts'
    }
  });

PostsavedSchema.plugin(mongoosePagination);
const Postsaved = model('postsaveds', PostsavedSchema);

export default  Postsaved 