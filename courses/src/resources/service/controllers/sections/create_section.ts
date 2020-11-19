import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

import moment from 'moment-timezone'
import AWS from 'aws-sdk';

const messages = {
    success: {
        es: 'Section creado correctamente',
        en: 'Section created correctly'
    },
    error: {
        es: 'Necesita proveer el id del capítulo y un nombre',
        en: 'You need to provide the chapter id and a name'
    },
    errorMessage: "Error en createSection controller"
}

const createSection = catchAsync( messages.errorMessage, async ( req, res ) => {

    const { language } = req

    const section: any = await model.PlaytecCourseSection.create(req.body)

    res.status( 200 ).json( {
        message: messages.success[ language ],
        section
    } )

} )

export default createSection