import * as controller from './resources/service/controllers/'

const fn = async ( req, res, next ) => {
  let fname = controller[ req.fname ]

  if ( !fname ) {
    return res.status( 500 ).json( { message: 'fname no existe' } )
  }

  return fname( req, res, next )
}

export default fn
