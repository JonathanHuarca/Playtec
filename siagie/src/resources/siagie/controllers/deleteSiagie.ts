import catchAsync from "../../../utils/catchAsync";
import {siagie} from '../models'
const errorMessage: String = "Error en create siage controller"

const deleteSiagie = catchAsync(errorMessage,async (req, res,next) => {
   
    const Siagiamodel = await siagie.findOne({_id:req.body.id}).remove().exec();
    res.status(200).json({
      message:'delete complete',
  });
  
})

export default deleteSiagie