import ErrorResponse from './errorResponse'

const catchAsync = (msg, fn) => {
  return(req, res, next) => {
    fn(req, res, next).catch((err) => {
      ErrorResponse(err, msg, 500)
      next(err)
    })
  }
}

export default catchAsync