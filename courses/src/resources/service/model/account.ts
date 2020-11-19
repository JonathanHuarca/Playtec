import { Schema, model } from 'mongoose'

const accountSchema = new Schema( {
    country: String,
    bank: String,
    account_bank: String,
    account_interbank: String,
    account_type: String,
    owner: String,
    dni: String,
    img: String,
    emails: []
} )

const Account = model( 'accounts', accountSchema )

export default Account