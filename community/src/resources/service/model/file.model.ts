import { Schema, model } from 'mongoose'
import { mongoosePagination } from "ts-mongoose-pagination";

const fileSchema = new Schema({

    filename: { type: String },
    url:{
      type:String,
      default:'not found'
    },
    type:{
      type:String,
      default:'not found'
    }
  });
  
fileSchema.plugin(mongoosePagination);
const File = model('files', fileSchema );

export default File