import catchAsync from "../../../utils/catchAsync";
const errorMessage = "Error en getSiagieAll controller"
import {siagie} from '../models'

const getSiagiaAll = catchAsync(errorMessage,async (req, res) => {
   console.log("Siagiamodel");
   const Siagiamodel = await siagie.find()
   
   res.json(Siagiamodel);
   
})

export default getSiagiaAll