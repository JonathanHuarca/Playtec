import { Schema, model } from 'mongoose'

const PresentationSchema = new Schema({
    name: String,
    description: String,
    length: Number,
    id_class: Schema.Types.ObjectId,
    thumbnail: String,
    type: String,
    videos:[{
        type: Schema.Types.ObjectId,
        ref: 'video'
    }],
    iframe: String
}, { timestamps: true } );

const Presentation = model( 'presentations', PresentationSchema )

export default Presentation