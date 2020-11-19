import catchAsync from "../../../../../utils/catchAsync"
import * as model from '../../../model';
import * as msg from './dictionary';

const deleteCourse = catchAsync( msg.msgDeleteCourse.errorMessage, async ( req, res, next ) => {

    const { language } = req

    const { id_course:course_id } = req.body

    const course = await model.Course.findById(course_id)
    if(!course){
        return res.status(500).json({
            message:msg.msgDeleteCourse.errorExisting
        })
    }
    await model.Course.findByIdAndRemove( course_id )

    res.status( 200 ).json( {
        message: msg.msgDeleteCourse.success[ language ]
    } )
} )

export default deleteCourse