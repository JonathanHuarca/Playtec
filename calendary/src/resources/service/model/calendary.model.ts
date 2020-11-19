import { Schema, model } from 'mongoose'
import { mongoosePagination } from "ts-mongoose-pagination";

const calendarySchema = new Schema({

  title:String,
  date_start:String,
  date_end:String,
  allDay:{type:Boolean,
    default:false},
  time_start:String,
  time_end:String,
  start: String, 
  end: String, 
  hexColor:  String,
  description:String,
  edit:{type:Boolean},
  user:Schema.Types.ObjectId
 
},{ timestamps: true }
  
 //Day,month,year

)

calendarySchema.plugin(mongoosePagination);

const userSchema = new Schema()

model('users', userSchema)

const Calendary = model('calendaries', calendarySchema)

export default Calendary