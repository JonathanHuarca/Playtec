import catchAsync from "../../../../utils/catchAsync"
import * as model from '../../model';

import AWS from 'aws-sdk'

const messages = {
    success: {
        es: 'Sección eliminada',
        en: 'Section deleted'
    },
    error: {
        es: 'No se encontró la sección',
        en: 'Section not founded'
    },
    errorMessage: "Error en deleteSection controller"
}

const s3 = new AWS.S3( {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
} )

const deleteSection = catchAsync( messages.errorMessage, async ( req, res, next ) => {

    const { language } = req

    const { section_id } = req.body

    const section: any = await model.PlaytecCourseSection
        .findById( section_id )
        .lean()
        .exec()

    if ( !section ) {
        return res.json( { message: messages.error[ language ] } )
    }

    await model.PlaytecCourseSection.findByIdAndRemove(section_id)

    res.status( 200 ).json( {
        message: messages.success[ language ],
        section
    } )
} )

export default deleteSection