import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    rol: {
      type: String,
      default: 'user'
    },
    state: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
)


userSchema.pre( "save", function ( this: any, next: any ) {
  if ( !this.isModified( 'password' ) ) {
    return next()
  }

  bcrypt.hash( this.password, 8, ( err, hash ) => {
    if ( err ) {
      return next( err )
    }

    this.password = hash
    next()
  } )
} )


userSchema.methods.checkPassword = function ( user, password: string ) {
  const passwordHash = user.password
  return new Promise( ( resolve, reject ) => {
    bcrypt.compare( password, passwordHash, ( err, same ) => {
      if ( err ) {
        return reject( err )
      }

      resolve( same )
    } )
  } )
}

export const User = model( 'play_user', userSchema )
