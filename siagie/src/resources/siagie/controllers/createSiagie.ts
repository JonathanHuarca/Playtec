import catchAsync from "../../../utils/catchAsync";
const errorMessage: String = "Error en create siage controller"
import {siagie} from '../models'

const createSiagie = catchAsync(errorMessage,async (req, res,next) => {
   
   const course = new siagie({
   course : req.body.course,
   competences : req.body.competences,
   level: req.body.level,
  })
   await course.save();
   res.status(200).json({
      message:'create complete',
  });
  
})

export default createSiagie