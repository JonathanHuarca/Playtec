import { Schema, model } from 'mongoose'

const courseSectionSchema = new Schema( {
    unity: {
        type: Schema.Types.ObjectId,
        required: true
    },
    description: {
        type:String,
        lowercase:true,
        default:""
    },
    section_name: {
        type: String,
        lowercase:true,
        required: true
    },
    number_section: {
        type: Number,
        required: true
    },
    files: [],
    achievement: String,
    video_url: String,
    duration: {
        type:String,
        lowercase:true
    },
    species: {
        type:String,
        lowercase:true
    }
} )

const PlaytecCourseSection = model( 'playtec_course_sections', courseSectionSchema )

export default PlaytecCourseSection