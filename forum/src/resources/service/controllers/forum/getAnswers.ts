import catchAsync from '../../../../utils/catchAsync'
import * as model from '../../model/'
import mongoose from 'mongoose'

const messages = {
    success: {
        es: 'Respuestas encontradas',
        en: 'Answers found'
    },
    error: {
        es: 'Error al obtener respuestas',
        en: 'Error getting answers'
    },
    notFound :{
        es : 'Preguna no encotrada',
        en : 'Question not found'
    },
    msg : {
        es : 'Error en el controlador get Answers'
    }
 }
 
const getAnswers = catchAsync(messages.msg.es, async (req, res, next) => {
    
    const { language } = req
    const { id_question } = req.body
    const id = new mongoose.Types.ObjectId(id_question)

    const existQuestion = await model.ForumQuestion.findById(id_question)
    if(!existQuestion){
        return res.status(400).json({
            message : messages.notFound[language]
        })
    }
    const answers = await model.Model_forumAnswers.find({id_question : id_question})        
        .populate({
            path:'answered_by',
            model:'users',
            select: {name: 1,lastname:1,photo:1}
        })
        .select({createdAt:0,updatedAt:0,__v:0})
        .lean()
    res.status(200).json({
        message : messages.success[language],
        answers : answers
        
        //answers : answers
    })
});

export default getAnswers