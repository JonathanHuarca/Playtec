import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import consola from 'signale'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import cluster from 'cluster'
import os from 'os'

// import files
import connectDB from './config/db'
import { payload } from './config/cluster'
import logger from './middleware/logger'
import errorHandler from './middleware/error'
import { protect, signup, signin } from './services/auth/user'
import routing from './routing'

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
app.use( cors() )
app.use( json() )
app.use( urlencoded( { extended: true } ) )
app.use( payload )
app.use( logger )

/** Routes */

app.post( '/signup', signup )
app.post( '/signin', signin )

// Environment
app.use( '/api', protect, routing )

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
    console.log( 'Cluster Master is: ', !!cluster.isMaster )
    if ( cluster.isMaster ) {
      console.log( 'this is the master process ', process.pid )
      for ( let i = 0; i < numberCPUs; i++ ) {
        cluster.fork(); // clonando cluster
      }
      cluster.on( 'exit', worker => {
        console.log( `worker process ${process.pid} had died.` )
        console.log( `only ${Object.keys( cluster.workers ).length} remainging` )
        console.log( 'starting new worker' )
        cluster.fork()
      } )
    } else {
      console.log( 'this the workers process ', process.pid )
      await connectDB();
      await httpServer.listen( PORT, () => {
        consola.success( `API on http://localhost:${PORT} process pip: ${process.pid}` )
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
