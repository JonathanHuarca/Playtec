const messages = {
  getOne:{
    es:"Usuario encontrado",
    en:"User found"
  },
  getMany:{
    es:"Usuarios encontrados",
    en:"Users found"
  }
}

export const getOne = (model, options) => async (req, res) => {
  try{
    const { language } = req
    const doc = await model
      .findOne(options)
      .select('-password')
      .lean()
      .exec()

    res.status(200).json({
      message: messages.getOne[language],
      fname:req.service,
      data:doc
    })
  }catch(e){
    res.status(500).send('error')
  }
}

export const getMany = (model, options, populate) => async (req, res) => {
  try{
    const { language } = req
    const doc = await model
      .find(options)
      .populate(populate)
      .lean()

    res.status(200).json({
      message: messages.getMany[language],
      fname:req.service,
      data:doc
    })
  }catch(e){
    res.status(500).send('error')
  }
}

const crudControllers = (model, options, populate) => ({
  getOne: getOne(model, options),
  getMany: getMany(model, options, populate)
})

export default crudControllers