import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    name: String,
    nickname: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    gender: {
        type: String,
        default: 'Male',
    },
    lastname: String,
    displayname: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    active: Boolean,
    upgrade: String,
    photo: String,
    courses: [],
    rol: {
        type: Number,
        default: 4
    }
  },
  { timestamps: true }
)


userSchema.pre("save", function(this: any, next: any){
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
        return next(err)
        }

        this.password = hash
        next()
    })
})
  
  
userSchema.methods.checkPassword = function(user, password:string) {
  const passwordHash = user.password
  return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
          return reject(err)
      }

      resolve(same)
      })
  })
}

export const User = model('users', userSchema)
