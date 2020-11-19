import { Schema, model } from 'mongoose'

const userCoursesSchema = new Schema( {
    course: {
        type: Schema.Types.ObjectId,
        required: true
    },
    units: [],
    state: Number,
    progress: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
}, { timestamps: true } )

const UserCourses = model( 'user_courses', userCoursesSchema )



export {UserCourses}