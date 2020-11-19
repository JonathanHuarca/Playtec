import catchAsync from "../../../utils/catchAsync";
const errorMessage = "Error in getSiagieLevel controller"
import {siagie} from '../models'

const getSiagieLevel = catchAsync(errorMessage, async (req, res,next) => {

   const Siagiamodel = await siagie.find({level:req.body.level})
   res.json(Siagiamodel);

   
})

export default getSiagieLevel