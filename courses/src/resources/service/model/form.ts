import { Schema, model } from 'mongoose'

const formSchema = new Schema( {
    course: Schema.Types.ObjectId,
    lesson: Schema.Types.ObjectId,
    title: String,
    exists_form_url: {
        type: Boolean,
        default: false
    },
    form_url: {
        type: String,
        default: ""
    },
    questions: []
} )

const Form = model( 'forms', formSchema )

export default Form