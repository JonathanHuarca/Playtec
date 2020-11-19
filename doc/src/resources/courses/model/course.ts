import { Schema, model } from 'mongoose'

const courseSchema = new Schema({
  createdBy:Schema.Types.ObjectId,
  course_name:String,
  description:String,
  date_start:Date,
  date_end:Date,
  image:String,
  competences:[],
  state:{
    type: String,
    default: 'active'
  },
  level:String,
  grade:{
    type: String,
    lowercase: true,
    default: "none"
  },
  lessons:[],
  school: {
    type: Boolean,
    default: false
  },
  section: {
    type: String,
    lowercase: true,
    default: "none"
  },
  students: []
})
const userSchema = new Schema()
model('users', courseSchema)
const Course = model('courses', courseSchema)

export default Course 