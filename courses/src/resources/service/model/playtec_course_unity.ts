import { Schema, model } from 'mongoose'

const playtecCourseUnitySchema = new Schema( {
    course: {
        type: Schema.Types.ObjectId,
        required: true
    },
    number_unity: {
        type: Number,
        required: true
    },
    unity_name: {
        lowercase:true,
        type: String,
        required: true
    },
} )

const PlaytecCourseUnity = model( 'playtec_course_units', playtecCourseUnitySchema )

export default PlaytecCourseUnity