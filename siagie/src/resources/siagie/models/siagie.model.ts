import { Schema, model } from "mongoose";

const siagieSchema = new Schema({
    course : String,
    competences: Array,
    level : Number,
})

const Siagie = model('siagia', siagieSchema)
export default Siagie