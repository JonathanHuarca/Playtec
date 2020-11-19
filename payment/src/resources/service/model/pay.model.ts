import { Schema, model } from 'mongoose'

const paySchema = new Schema({
  course_id:Schema.Types.ObjectId,
  token:String,
  user_id:Schema.Types.ObjectId,
  pay_id:String,
})

const coursesSchema = new Schema()

model('courses-playtecs', coursesSchema)

const Pay = model('payments', paySchema)

export default Pay