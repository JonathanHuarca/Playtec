import { Schema, model } from 'mongoose'

const courseSchema = new Schema( {
  createdBy: Schema.Types.ObjectId,
  code: {
    type: String,
    default: '0000000',
    lowercase: true
  },
  temporary_code: {
    type: String,
    default: '00000000000000',
    lowercase: true
  },
  course_name: {
    type: String,
    default: '',
    lowercase: true
  },
  description: {
    type: String,
    default: '',
    lowercase: true
  },
  image_url: {
    type: String,
    default: 'https://www.welivesecurity.com/wp-content/uploads/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg'
  },
  competences: [],
  state: {
    type: String,
    default: 'active'
  },
  school: {
    type: Boolean,
    default: false
  },
  level: String,
  grade: {
    type: String,
    lowercase: true,
    default: "none"
  },
  section: {
    type: String,
    lowercase: true,
    default: "none"
  }
} )

const Course = model( 'courses', courseSchema )

export default Course 