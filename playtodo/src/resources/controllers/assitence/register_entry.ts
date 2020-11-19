import catchAsync from "../../../utils/catchAsync";
import * as model from "../../models"

const messages = {
    success: {
        es: 'Su entrada fue registrada',
        en: 'Your entry was registered'
    },
    errorMessage: 'Error en registerAttendance controller'
}

const registerAttendance = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const { _id: id_user } = req.user

    const assistence = await model.Assistence.create( {
        user: id_user,
    } )

    res.json( {
        message: messages.success[ language ],
        assistence
    } )

} )

export default registerAttendance