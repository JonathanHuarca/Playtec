import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model"

const messages = {
    success: {
        es: 'Unidades encontrados',
        en: 'Unity founded'
    },
    error: {
        es: 'Sin resultados',
        en: 'Without results'
    },
    errorMessage: "Error en getUnits controller"
}

const getUnits = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req
    const { course_id: course } = req.body

    const units: any = await model.PlaytecCourseUnity
        .find( { course: course } )
        .lean()
        .exec()

    if ( !units.length ) {
        return res.json( { message: messages.error[ language ] } )
    }

    // await Promise.all(
    //     units.map( async unity => {
    //         const sections = await model.PlaytecCourseSection
    //             .find( { unity: unity._id } )
    //             .lean()
    //             .exec()

    //         unity.sections = sections
    //     } )
    // )

    res.status( 200 ).json( {
        message: messages.success[ language ],
        units
    } )

} )

export default getUnits