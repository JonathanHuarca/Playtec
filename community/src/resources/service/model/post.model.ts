import { Schema, model } from 'mongoose'
import { mongoosePagination } from "ts-mongoose-pagination";

const postSchema = new Schema({
  user:Schema.Types.ObjectId,
  name:String,
  edit:Boolean,
  update:String,
  create:String,
  saved:{
    type:Boolean,
    default:false
  },
  description: { type: String },
  file:[{
    type: Schema.Types.ObjectId,
    ref: 'files'
  }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
  })

const userSchema = new Schema()
model('users', userSchema)
postSchema.plugin(mongoosePagination);
const Post = model('posts', postSchema);

export default Post



