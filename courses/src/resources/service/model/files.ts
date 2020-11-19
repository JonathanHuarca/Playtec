import { Schema, model} from "mongoose"

// =============================
const props = {
  lowercase : true,
  type      : String
}
// =============================

const filesSchema = new Schema({
  name: props,
  type: props,
  url : String
})

const Files = model("files", filesSchema)

export default Files 