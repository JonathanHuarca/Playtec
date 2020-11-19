import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    name:{
      type:String,
      lowercase:true
    },
    lastname:{
      type:String,
      lowercase:true
    },
    username:{
      type:String,
      unique:true,
      lowercase:true,
      trim: true
    },
    photo:{
      type:String,
      default:""
    },
    email: {
      type: String,
      unique:true,
      lowercase:true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    domain:{
      type:String,
      lowercase:true,
      default:""
    },
    rol:{
        type:String,
        default:'0'
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
const courseSchema = new Schema()

model('courses', courseSchema)

export const User = model('user', userSchema)
