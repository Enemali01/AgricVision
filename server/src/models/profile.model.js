import {model, Schema} from 'mongoose'

export const PictureSchema = new Schema (
  {
    myFile:{type:String},
  }
)
export const Picture = model('profile', PictureSchema)