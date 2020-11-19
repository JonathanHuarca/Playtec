import { Schema, model } from 'mongoose'

const commentSchema = new Schema( {
    text: String,
    work: {
        type: Schema.Types.ObjectId,
        required: true
    }
} )

const commentModel = model( 'play_comments', commentSchema )

export default commentModel