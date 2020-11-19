import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    id_lesson : Schema.Types.ObjectId,
    question : String,
    answers : []
})

const question_model = model('question', questionSchema)
export default question_model