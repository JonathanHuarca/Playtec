import color from 'chalk'

const logger = (req, res, next) => {
  const colorMethod = (method) => {
    let http;
    switch(method){
      case 'GET':
        http = color.green(method)
        break;
      case 'POST':
        http = color.yellow(method)
        break;
      case 'PUT':
        http = color.cyan(method)
        break;
      case 'DELETE':
        http = color.red(method)
        break;
    }
    return http;
  }
  if(process.env.NODE_ENV !== 'testing'){
    console.log(`${colorMethod(req.method)} ${res.statusCode} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
  next()
}

export default logger