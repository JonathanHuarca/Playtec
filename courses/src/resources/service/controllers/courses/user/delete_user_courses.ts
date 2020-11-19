import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model";

const messages = {
    success: {
        es: 'Cursos de usuarios borrado',
        en: 'User courses deleted'
    },
    errorMessage: 'Error en deleteUserCourses controller'
}

const deleteUserCourses = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    await model.UserCourses.deleteMany( {} )

    res.status( 200 ).json( {
        message: messages.success[ language ]
    } )

} )

export default deleteUserCourses