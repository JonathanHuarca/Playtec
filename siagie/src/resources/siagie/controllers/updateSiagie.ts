import catchAsync from "../../../utils/catchAsync";
const errorMessage = "Error in update state siagie controller"
import {siagie} from '../models'

const updateSiagie = catchAsync(errorMessage, async (req, res) => {

    const {id:_id} = req.body
    const sia =await siagie.
                            findByIdAndUpdate(
                                _id,
                                req.body,
                                {new:true}
                            )
                            .lean()
                            .exec()
     await siagie.findOne({_id:req.body.id})
   
       
    res.status(200).json({
        message:'update complete',
        siagie: sia
    })
   
})

export default updateSiagie