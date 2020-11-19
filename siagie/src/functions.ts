import * as controller  from './resources/siagie/controllers'

const fn = async (req, res) => { 
  let fname

  fname = controller[ req.fname ]
  
  if ( !fname ) {
    return res.status( 500 ).json( { message: 'fname no existe' } )
  }
  console.log(fname);
  return fname( req, res )
}

export default fn
