import { Schema, model } from 'mongoose'
import moment from 'moment-timezone'

const taskSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    },
    leader: {
        type: Schema.Types.ObjectId,
        // required: true
    },
    integrant: {
        type: Schema.Types.ObjectId,
        // required: true
    },
    time_publication: {
        type: String,
        default: moment().tz( 'America/Lima' ).format( 'DD-MM-YYYY HH:mm' ).toString()
    },
    time_init: String,
    time_finish: String,
    time_duration: String
} )

const taskModel = model( 'play_tasks', taskSchema )

export default taskModel