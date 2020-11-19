import { Schema, model, connection} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    name:String,
    lastname:String,
    nickname:{
      type:String,
      required: true,
      unique:true,
      lowercase:true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
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
