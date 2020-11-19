import color from 'chalk'
import morgan from 'morgan'
import moment from 'moment-timezone'

morgan.token('fname',(req:any) => {
  return req.fname
})

morgan.token('service',(req:any) => {
  return req.service
})

morgan.token('error',(req, res) => {
  return res.statusMessage

})

morgan.token('date', (req, res, tz:any) => {
  return moment().tz(tz).format('DD/MM/YYYY - HH:mm:ss');
})

const logger = () => {
  return `
  ${color.bold.hex('#229fff')('SERVICE')} : ${color.bold(':service')}
  ${color.bold.hex('#229fff')('DATE')}    : ${color.hex('#229fff')(':date[America/Lima]')}
  ${color.bold.hex('#229fff')('METHOD')}  : ${color.bold(':method')}
  ${color.bold.hex('#229fff')('URL')}     : ${color.hex('#229fff')(':url')} 
  ${color.bold.hex('#229fff')('FNAME')}   : ${color.bold(':fname')}
  ${color.bold.hex('#229fff')('STATUS')}  : ${color.hex('#229fff')(':status' )}
  ${color.bold.hex('#229fff')('IP')}      : ${color.bold(':remote-addr')}
  ${color.bold.hex('#229fff')('TIME')}    : ${color.hex('#229fff')(':response-time')} ms
  ${color.bold.hex('#229fff')('MESSAGE')} : ${color.bold(':error')}
  ${color.bold.gray('==================================')}`
}

export default logger