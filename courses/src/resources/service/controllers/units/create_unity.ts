import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {
    success: {
        es: 'Unidad creada correctamente',
        en: 'Unity created correctly'
    },
    error: {
        es: 'Error al crear unidad',
        en: 'Fail to create unity'
    },
    errorMessage: "Error en createunity controller"
}

const createUnity = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    req.body.course = req.body.id_course

    const unity = await model.PlaytecCourseUnity.create( req.body )

    res.status( 200 ).json( {
        message: messages.success[ language ],
        unity
    } )

} )

export default createUnity