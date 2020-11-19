import catchAsync from "../../../utils/catchAsync";
const errorMessage = "Error in getSiagie ID controller"
import {siagie} from '../models'

const getSiagieID = catchAsync(errorMessage, async (req, res) => {

   const Siagiamodel = await siagie.findOne({_id:req.body.id})
   res.json(Siagiamodel);

   
})

export default getSiagieID