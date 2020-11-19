import { Schema, model } from 'mongoose'

const UserSchema = new Schema( {} )

const User = model( 'users', UserSchema )

export default User