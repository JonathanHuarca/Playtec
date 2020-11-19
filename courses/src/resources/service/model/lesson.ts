import { Schema, model } from "mongoose";

const lessonSchema = new Schema( {
    course_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    image_url: {
        type: String,
        default: 'https://www.welivesecurity.com/wp-content/uploads/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg'
    },
    name_lesson: {
        type: String,
        lowercase: true,
        default: ''
    },
    code: {
        type: String,
        default: '00000000',
        lowercase: true
    },
    description: {
        type: String,
        lowercase: true,
        default: ''
    },
    video_url: {
        type: String,
        default: ''
    },
    slides_url: {
        type: String,
        default: ''
    }
} )

const lesson_model = model( 'lesson', lessonSchema )
export default lesson_model