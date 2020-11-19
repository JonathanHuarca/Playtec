import { Schema, model } from 'mongoose'

const coursePlaytecSchema = new Schema( {
    createdBy:Schema.Types.ObjectId,
    course_name:String,
    description:String,
    date_start:Date,
    date_end:Date,
    price: Number,
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
} )

const CoursePlaytec = model( 'courses_playtec', coursePlaytecSchema )

export default CoursePlaytec