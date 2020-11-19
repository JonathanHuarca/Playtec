import axios from 'axios'
import catchAsync from './catchAsync'

import decode from 'jwt-decode'

const {
    NODE_ENV,
    AUTH_URL,
    AUTH_URL_PROD,
} = process.env

const BASE_URL = NODE_ENV === 'production' ? AUTH_URL_PROD : AUTH_URL

const protect = catchAsync( 'Error en protect controller', async ( req, res, next ) => {

    const bearer = req.headers.authorization
    
    



    if ( !bearer || !bearer.startsWith( 'Bearer ' ) ) {
        return res.status( 401 ).end( 'Unauthorized' )
    }

    const token = bearer.split( 'Bearer ' )[ 1 ].trim()
    
    if(!token){
        console.log("token no existe", token)
        req.user = null
        return next()
    }

    let payload

    payload = decode( token );

    if ( !payload ) {
        return res.status( 200 ).json( {
            message: 'Token no existe o a expirado!!',
            state: false
        } )
    }

    console.log( 'payload', payload )
    const { data: user } = await axios( {
        method: 'POST',
        url: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            fname: 'getUser',
            service: 'users',
            id_user: payload.id
        }
    } )
    console.log( 'user: ', user )
    if ( !user ) {
        return res.status( 401 ).end( 'User undefined' )
    }

    req.user = user.data
    next()
} )

export { protect }