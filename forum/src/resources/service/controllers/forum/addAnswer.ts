import catchAsync from '../../../../utils/catchAsync'
import * as model from '../../model/'
import moment from 'moment-timezone'

const msg = 'Error en el controlador add answer forum'
const messages = {
    success: {
        es: 'Respuesta creada correctamente',
        en: 'Answer created successfully'
    },
    notFound : {
        es : 'No se encontro la pregunta',
        en : 'Question not found'
    },
    error: {
        es: 'Error al crear respuesta',
        en: 'Answer creation failed'
    }
 }
 
const addAnswer = catchAsync(msg, async (req, res, next) => {
    const { language } = req
    const { id_question } = req.body
    const existsQuestion = await model.ForumQuestion.findById(id_question)
    if(!existsQuestion){
        return res.status(400).json(
            {
                message : messages.notFound[language]
            }
        )
    }
    const date = moment().tz('America/Lima').format('DD/MM/YYYY - HH:mm:ss');
    req.body.answered_by = req.user._id
    req.body.date_of_creating = date
    const answer  = await model.Model_forumAnswers.create(req.body)
    res.status(200).json(
       {
          message : messages.success[language],
          answer : answer
       }
    )
});

export default addAnswer