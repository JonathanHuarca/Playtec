import { Schema, model } from "mongoose";

const videoSchema = new Schema({
    url : String,
    name : String
})

const video_model = model('video', videoSchema)
export default video_model