import * as worksController from './resources/controllers'

const fn = async ( req, res ) => {
    let fname: any;
    console.log( 'lala', req.service, req.fname )
    switch ( req.service ) {
        case 'works':
            fname = worksController[ req.fname ]
            break;
        default:
            return res.status( 500 ).json( { message: 'Servicio no existe' } )
    }


    if ( !fname ) {
        return res.status( 500 ).json( { message: 'fname no existe!!' } )
    }

    return fname( req, res )
}

export default fn
