import { Schema, model } from 'mongoose'

const formStudentSchema = new Schema( {
    id_class: Schema.Types.ObjectId,
    titleForm: String,
    student: {},
    id_stud: Schema.Types.ObjectId,
    formRevised: []
} )

const Form_student = model( 'forms_student', formStudentSchema );

export default Form_student
