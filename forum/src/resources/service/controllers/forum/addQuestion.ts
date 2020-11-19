import catchAsync from '../../../../utils/catchAsync'
import * as model from '../../model/'
import moment from 'moment-timezone'

const msg = 'Error en el controlador add questions forum'
const messages = {
    success: {
        es: 'Pregunta creada correctamente',
        en: 'Question created successfully'
    },
    error: {
        es: 'Error al crear pregunta',
        en: 'Question creation failed'
    }
 }
 
const addQuestion = catchAsync(msg, async (req, res, next) => {
    const { language } = req
    
    const date = moment().tz('America/Lima').format('DD/MM/YYYY - HH:mm:ss');
    req.body.asked_by = req.user._id
    req.body.date_of_creating = date
    const question  = await model.ForumQuestion.create(req.body)
    res.status(200).json(
       {
          message : messages.success[language],
          question : question
       }
    )
});

export default addQuestion