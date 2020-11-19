import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model";

const getUserCourses = catchAsync( 'Error', async ( req, res ) => {
    const userCourses = await model.UserCourses
        .find()
        .populate( {
            path: 'course',
            model: 'courses_playtec'
        } )
        .lean()
        .exec()



    res.status( 200 ).json( {
        message: 'User courses',
        userCourses
    } )
} )

export default getUserCourses