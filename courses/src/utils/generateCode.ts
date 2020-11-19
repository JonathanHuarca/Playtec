const generateCode = async ( model ) => {

  const abc = 'abcdefghijklmnpqrstuvwxyz123456789'
  let code = ''

  while ( code.length !== 9 ) {
      const number = Math.floor( Math.random() * abc.length )
      const letter = abc.split( '' )[ number ]
      code = code + letter
  }

  const courseExists = await model.findOne( { code } )

  if ( courseExists ) {
      generateCode( model )
  }
  return code
}

export default generateCode 