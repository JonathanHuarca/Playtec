import { Schema, model } from 'mongoose'

const forumQuestionSchema = new Schema(
  {
    id_section:Schema.Types.ObjectId,
    question : String,
    asked_by : Schema.Types.ObjectId,
    answers : [],
    date_of_creating : String
  },
  {
    timestamps : true
  }
)

const courseSchema = new Schema()

export const User =  model('users', courseSchema)

export const ForumQuestion = model('forum_questions', forumQuestionSchema)

