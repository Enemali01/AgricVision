import { model, Schema } from "mongoose";

export const vidoeSchema = new Schema (
  {
title:{
  type: String, 
  required: true,
},
videos: [Object]
},{timestamps:true});

export const Video = model('video', vidoeSchema)