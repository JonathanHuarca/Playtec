import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {

  success: {

    es: "Calendario actualizado correctamente",
    en: "Calendar updated correctly"
  },

  notFound: {

    es: "Calendario no encontrado",
    en: "Calendar not found"
  },

  membership: {

    es: "Este calendario no se pudo actualizar por que no le pertenece",
    en: "This calendar could not be updated because it does not belong to you"
  },

  errorMessage: 'Error en updateCalendary controller'
};

const updateCalendary = catchAsync(messages.errorMessage, async (req, res, next) => {
  
  const {language} = req || 'es'
  const { _id:user, name,nickname } = req.user
  const {
    calendary_id,
    date_start,
    date_end,
    time_start,
    time_end,
    allDay
  } = req.body

  const cal = await model.Calendary.findById(calendary_id);

  req.body.start = `${date_start || cal.date_start}, ${time_start || cal.time_start} || "00:00:00 "`;
  req.body.end = `${date_end || cal.date_end}, ${time_end || cal.time_end} || "00:00:00 "`;


  if (!cal) {

      res.status(400).json({
      message: messages.notFound[ language ],
    });
  }
  if (cal.user ==user) {
     
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
  
      req.body.start = date_start + " , " + time_start;
      req.body.end = date_end + " , " + time_end;
      req.body.edit = true;
      
     }

     const calendario = await model.Calendary.findByIdAndUpdate(calendary_id, req.body, {
     new: true,
    }).select('-createdAt -updatedAt -date_start -time_start -time_end -date_end').lean()
    .exec()
  
      res.status( 200 ).json({
      message: messages.success[ language ],
      data: calendario
  })

  } else {

      res.status(400).json({
      message: messages.membership[language],
    });

}})

export default updateCalendary;
