import { Schema, model } from 'mongoose'

const objetivesSchema = new Schema({

  title:String,
  type:String,
  state:{
    type:Number,
    default:0
  },
  priority:{
    type:Number,
    default:0
  }
  },{ timestamps: true })

const Objetive = model('objetives', objetivesSchema);

export default Objetive