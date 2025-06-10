import { model, Schema } from "mongoose";
import { type } from "os";

export const PostSchema = new Schema(
  {
    title:{type: String},
    description:{type: String},
    file: {type: String},
    tags:[String],
    createdAt: {type: Date},
  },{timestamp:true}
)
export const Posts = model('post', PostSchema);