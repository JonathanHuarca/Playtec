import { Schema, model } from 'mongoose'
const props = {
  lowercase:true,
  type:String,
  default:''
}

const num = {
  type:Number,
  default:0
}

const playtecCourseSchema = new Schema({

  createdBy: Schema.Types.ObjectId,

  description: props,
  level:props,
  code:props,
  duration: props,
  category: props,
  keyworks:{
    type:[],
    lowercase:true,
    default:["---"]
  },
  publish: {
    type: Boolean,
    default: false
  },

  course_name: {
    ...props,
    required: true
  },

  price:{
    soles:{
      normal:num,
      offer:num,
    },
    dollar:{
      normal:num,
      offer:num
    }
  },
  certified:{
    description:props,
    image:{
      type:Schema.Types.ObjectId, 
      default:"5f6e6696e73e099d155c5a39"
    }
  },

  teacher:{
    name:props,
    description:props,
    image:{
      type:Schema.Types.ObjectId, 
      default:"5f6e6696e73e099d155c5a39"
    }
  },

  images:{
    main:{
      type:Schema.Types.ObjectId, 
      default:"5f6e6696e73e099d155c5a39"
    },
    detail:{
      type:Schema.Types.ObjectId, 
      default:"5f6e6696e73e099d155c5a39"
    },
    modal:{
      type:Schema.Types.ObjectId, 
      default:"5f6e6696e73e099d155c5a39"
    }
  }
})

const PlaytecCourse = model( 'playtec_courses', playtecCourseSchema )

export default PlaytecCourse