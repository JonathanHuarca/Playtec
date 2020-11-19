import catchAsync from '../../../../utils/catchAsync'
import * as model from '../../model/'

const msg = 'Error en el controlador get forum'
const messages = {
    success: {
        es: 'Foro encontrado',
        en: 'Forum found'
    },
    empty :{
        es : 'Esta seccion no tiene preguntas aun',
        en : 'This section has no questions yet'
    },
    error: {
        es: 'Error al crear pregunta',
        en: 'Question creation failed'
    },
    msg : {
        es : 'Error en el controlador get questions'        
    }
 }
 
const getQuestions = catchAsync(messages.msg.es, async (req, res, next) => {
    const { language } = req
    const { id_section } = req.body
    const questions = await model.ForumQuestion.find
        ({id_section : id_section})
        .populate({
            path:'asked_by',
            model:'users',
            select: {name: 1,lastname:1,photo:1}
        })
        .select({createdAt:0,updatedAt:0,__v:0})
        .lean()   
     
    if(!questions.length){
        return res.status(200).json({
            message : messages.empty[language],
            questions : questions
        })
    }                                
    res.status(200).json({
        message : messages.success[language],
        questions : questions
        
        //answers : answers
    })
});

export default getQuestions