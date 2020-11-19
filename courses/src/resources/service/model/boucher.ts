import { Schema, model } from 'mongoose'

const boucherSchema = new Schema( {
    name: String,
    url: String,
    observation: String,
    bank: String,
    currency: String,
    id_user: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true } )

const Boucher = model( 'boucher|', boucherSchema )

export default Boucher