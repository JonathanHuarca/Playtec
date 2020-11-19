import { Schema, model } from 'mongoose'
import moment from 'moment-timezone'

const assistenceSchema = new Schema( {
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    entry_time: {
        type: String,
        default: moment().tz( 'America/Lima' ).format( 'DD-MM-YYYY HH:mm' ).toString()
    },
    departure_time: String
} )

const assistenceModel = model( 'play_assistence', assistenceSchema )

export default assistenceModel