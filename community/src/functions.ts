import * as controller  from './resources/service/controllers'

const fn = async (req, res) => { 
  let fname

  fname = controller[ req.fname ]
  
  if ( !fname ) {
    return res.status( 500 ).json( { message: 'fname no existe' } )
  }

  return fname( req, res )
}

export default fn
