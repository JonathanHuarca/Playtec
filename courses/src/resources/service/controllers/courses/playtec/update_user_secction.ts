import catchAsync from "../../../../../utils/catchAsync";
import * as model from "../../../model"

const messages = {
    success: {
        es: 'Sección actualizado para usuario',
        en: 'Section updated for user'
    },
    error: {
        es: 'No se encontraron resultados',
        en: 'Courses not found'
    },
    errorMessage: "Error en getPlaytecCourses controller"
}

const updateUserSection = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req
    const { section_id } = req.body

    const updatedSection = await model.UserPlaytecSection.findByIdAndUpdate(section_id, {progress:1},{new:true})
    

    res.status( 200 ).json( {
        message: messages.success[ language ],
        section:updatedSection
    })
})

export default updateUserSection