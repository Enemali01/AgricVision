import {model, Schema} from "mongoose"

export const memberSchema = new Schema (
  {
    lastname:{type: String},
    firstname:{type: String},
    email:{type: String},
    phone:{type: String},
    position:{type: String},
  },{timestamp:true}
)
export const Members = model('members', memberSchema)