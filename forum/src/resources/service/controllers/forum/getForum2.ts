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
    }
 }
 
const getForum = catchAsync(msg, async (req, res, next) => {
    const { language } = req
    const { id_section } = req.body
    const questions = await model.ForumQuestion.find
                                                ({id_section : id_section})
                                                .populate({
                                                    path:'asked_by',
                                                    model:'users',
                                                    select: {nickname: 1}
                                                })
                                                .select({createdAt:0,updatedAt:0,__v:0})
                                                .lean()   
     
    if(!questions.length){
        return res.status(200).json({
            message : messages.empty[language],
            forum : questions
        })
    }                                
     
    const id_questions = questions.map((item)=>{
        return item._id
    })
    const answers = await model.Model_forumAnswers.aggregate([
        {
            $match :{ //FILTRAMOS LAS RESPUESTAS POR ID DE PREGUNTAS
                id_question : { "$in": id_questions }
            }            
        },
        {
            $lookup : { //Buscamos los datos de los usuarios
                 from: 'users',
                 localField: 'answered_by',
                 foreignField: '_id',
                 as: 'usuario'
            }
        },
        {
            "$unwind": "$usuario"
        },
        {
            $group : { //LAS AGRUPAMOS POR ID DE PREGUNTA
                _id : '$id_question',
                answers: {
                    $push: { 
                        _id: "$_id",
                        answer : '$answer',
                        answered_by : '$answered_by',
                        date_of_creating : '$date_of_creating',
                        /*answered_by : {
                            _id : '$usuario_id',
                            name : '$usuario.nickname'
                        }*/
                    } 
                }          
            }
        },
        
    ])

    questions.map((question ,index_question,array_question:any)=>{
        answers.map((answer , index_answer, array_answer)=>{
            if(answer._id.toString() === question._id.toString()){
                console.log("iguales");
                array_question[index_question].answers = array_answer[index_answer].answers
            }
        })
    })

    res.status(200).json({
        message : messages.success[language],
        forum : questions,
        answers : answers
        
        //answers : answers
    })
});

export default getForum