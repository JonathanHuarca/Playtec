import { Schema, model } from 'mongoose'

const forumAnswersSchema = new Schema(
  {
    id_question:Schema.Types.ObjectId,
    answer : String,
    answered_by : Schema.Types.ObjectId,
    date_of_creating : String
  },
  {
    timestamps : true
  }
)

const model_forumAnswers = model('forum_answers', forumAnswersSchema)

export default model_forumAnswers