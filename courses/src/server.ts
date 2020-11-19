import express from 'express'
import dotenv from 'dotenv'
import color from 'chalk'
import morgan from 'morgan'
import http from 'http'
import consola from 'signale'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import cluster from 'cluster'
import os from 'os'
// import files
import connectDB from './config/db'
import verifyAccess from './utils/verifyAccess'
import { payload } from './config/cluster'
import logger from './middleware/logger'
import errorHandler from './middleware/error'
import routing from './routing'
import { protect } from './utils/protect'
import path from 'path'
import fileUpload from 'express-fileupload'
import protectDev from './utils/protectDev'

dotenv.config()

const app = express()
const httpServer = http.createServer( app )
const PORT = process.env.PORT
let numberCPUs;
numberCPUs = 1

if ( process.env.NODE_ENV === 'production' ) {
  numberCPUs = os.cpus().length
}

app.disable( 'x-powered-by' )
app.use( express.static( './temp' ) )
app.use( cors() )
app.use( fileUpload( {
  createParentPath: true
} ) );
app.use( json() )
app.use( urlencoded( { extended: true } ) )
app.use( payload )
app.use( morgan( logger() ) )

/** Routes */
if ( process.env.NODE_ENV === 'production' ) {
  app.use( '/free', routing )
  app.use( '/api', protect, routing )
  app.use( '/verify/:id/:code_temporary', verifyAccess )
} else {
  // app.use( '/free', routing )
  app.use( '/api', protectDev, routing )
  app.use( '/verify/:temporary_code/:course_id', verifyAccess )
  // app.use( '/api', routing )
}
app.use( '*', ( req, res, next ) => {
  res.json( {
    message: 'Ruta no disponible',
    path: req.originalUrl
  } )
} )

/** Error */
app.use( errorHandler )

let server: any;

const start = async () => {
  try {
    if ( cluster.isMaster ) {
      for ( let i = 0; i < numberCPUs; i++ ) {
        cluster.fork(); // clonando cluster
      }
      cluster.on( 'exit', worker => {
        cluster.fork()
      } )
    } else {
      await connectDB();
      await httpServer.listen( PORT, () => {
        consola.success( `API-Gateway on ${color.yellow( `http://localhost:${PORT}` )} process pip: ${process.pid}` )
        consola.success( 'Press CTRL-C to stop\n' );
      } )
    }
  } catch ( e ) {
    consola.success( 'Error server' )
  }
}

process.on( 'unhandledRejection', ( err, promise ) => {
  consola.error( `Error ${err}` )
  server.close( () => {
    /** close server & exit process */
    process.exit( 1 )
  } )
} )

export { app, start };
