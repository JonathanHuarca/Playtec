import catchAsync from '../../../../utils/catchAsync'
import * as model from '../../model'


const messages = {
  success: {
      es: 'Evento creado correctamente',
      en: 'Event successfully created'
  },
  error: {
      es: 'Error al registrar el evento',
      en: 'Failed to register event'
  },
  errorMessage: 'Error en createCalendary controller'
}


const createCalendary = catchAsync(messages.errorMessage, async (req, res, next) => {

  const {language} = req || 'es'
  const { _id:user, name } = req.user
  const { date_start ,date_end, time_start, time_end, allDay} = req.body

  if(allDay==true || allDay =='true'){

    //la fecha
    let TuFecha = new Date(date_end);
    //dias a sumar
    let dias = parseInt("1");
    
    //nueva fecha sumada
    TuFecha.setDate(TuFecha.getDate() + dias);
    let month =(TuFecha.getMonth() + 1); 

    if( month < 10 ){
     let  newmonth ='0' + month
      //formato de salida para la fecha
     req.body.end = TuFecha.getFullYear() + '-' + newmonth + '-' + TuFecha.getDate();
     req.body.start = date_start;
     req.body.edit = true;
     
    }else{
     req.body.end = TuFecha.getFullYear() + '-' + month + '-' + TuFecha.getDate();
     req.body.start = date_start;
     req.body.edit = true;
    }

  }else{

    req.body.start = date_start + " , "+ time_start
    req.body.end = date_end + " , "+ time_end
    req.body.edit = true;
  
  }

  const calendary = await model.Calendary.create({...req.body, user})

  const calendars = await model.Calendary.findById(calendary._id).select('-createdAt -updatedAt -date_start -time_start -time_end -date_end').lean()
  .exec()

  res.status( 200 ).json({
    message: messages.success[ language ],
    data: calendars
})

});

export default createCalendary