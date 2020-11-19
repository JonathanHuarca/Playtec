import catchAsync from "./catchAsync";
import * as model from "../resources/service/model"

const verifyAccess = catchAsync( 'Error en verifyAccess', async ( req, res, next ) => {

    const temporary_code = req.params.temporary_code
    const course_id = req.params.id

    const course = await model.Course
        .findOne( {
            course_id: course_id,
            temporary_code: temporary_code
        } )
        .lean()
        .exec()

    if ( !course ) {
        return res.status( 500 ).json( { message: 'Código inválido o no habilitado' } )
    }

    res.status( 200 ).json( {
        message: 'Clase encontrada',
        exist: true
    } )

} )

export default verifyAccess