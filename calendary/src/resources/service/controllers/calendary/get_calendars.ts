import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";

const messages = {

  success: {
      es: 'Eventos encontrados',
      en: 'Events found'
  },
  error: {
      es: 'Sin resultados',
      en: 'Whitout results'
  },
  errorMessage: 'Error en getCalendars controller'

}

const getCalendars = catchAsync(messages.errorMessage,async (req, res,next) => {
    const { _id, name, nickname } = req.user;
    const {language} = req || 'es';

    const calendars2 = await model.Calendary.find({user:_id}).lean()
    .exec()

    for (var i in calendars2) {
    
      let id_user = calendars2[i]["user"];
      let id_calendary: String = calendars2[i]["_id"];

      if (id_user==_id) {

        var update_t = {  $set: { edit: true }};
        let calendars1 =  await model.Calendary.findByIdAndUpdate(
          id_calendary,
          update_t,
          { new: true}
        );

      } else {
           
        var update_f = {$set: { edit: false }};
        let calendars3 = await model.Calendary.findByIdAndUpdate(
          id_calendary,
          update_f,
          { new: true, }
        );
      }
    }

    // const calendars = await model.Calendary.paginate({}, options);
    const calendars = await model.Calendary.find({user:_id}).select('-createdAt -updatedAt -date_start -time_start -time_end -date_end') .lean()
    .exec()

      res.status( 200 ).json({
      message: messages.success[ language ],
      data: calendars
  })

  }
);

export default getCalendars;
