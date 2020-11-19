import catchAsync from "../../../../utils/catchAsync";
import * as model from "../../model";
const msg = "Error en el controlador getCalendary";

const getCalendary = catchAsync(msg, async (req, res, next) => {
  const { _id, name, nickname } = req.user;

  const { page, perPage } = req.body;
  const options = {
    select: "-date_start -date_end -time_start -time_end -updatedAt -edit",

    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    sort: { update: -1 },
    populate: "users",
  };

  const calendars = await model.Calendary.paginate({ user: _id }, options);

  return res.status(200).json({
    message: `calendarios del usuario ${nickname}`,
    data: calendars,
  });
});

export default getCalendary;
