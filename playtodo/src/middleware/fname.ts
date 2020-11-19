
const fname = async ( req, res, next ) => {

    const { fname, service, language } = req.body

    if ( !fname && !service ) {
        return res.status( 500 ).json( {
            message: 'Por favor ingresa una función o servicio'
        } )
    }

    req.fname = fname
    req.service = service
    req.language = language || 'es'

    next()
}

export default fname
