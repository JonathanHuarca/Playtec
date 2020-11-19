import { Schema, model} from 'mongoose'

const userPlaytecCourseSchema = new Schema({
  course: {
      type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
  state: Number,
  progress: {
      type: Number,
      default: 0
  }
},
{ 
  timestamps: true 
})

const userPlaytecUnitySchema = new Schema({
  unity: {
      type: Schema.Types.ObjectId,
  },
  course:{
    type: Schema.Types.ObjectId,
  },
  state: Number,
  progress: {
      type: Number,
      default: 0
  },
  user: {
      type: Schema.Types.ObjectId,
  },
},
{ 
  timestamps: true 
})

const userPlaytecSectionSchema = new Schema({
  section: {
      type: Schema.Types.ObjectId,
  },
  unity:{
    type: Schema.Types.ObjectId,
  },
  course:{
    type: Schema.Types.ObjectId,
  },
  state: Number,
  progress: {
      type: Number,
      default: 0
  },
  user: {
      type: Schema.Types.ObjectId,
  },
},
{ 
  timestamps: true 
})
export const UserPlaytecCourse = model( 'user_playtec_courses', userPlaytecCourseSchema )
export const UserPlaytecUnity = model( 'user_playtec_units', userPlaytecUnitySchema )
export const UserPlaytecSection = model( 'user_playtec_sections', userPlaytecSectionSchema )
