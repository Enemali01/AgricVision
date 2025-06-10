import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    lastname:{type: String},
    firstname:{type: String},
    email:{type:String, required: true, unique: true},
    password:{type: String, required: true},
    phone: {type: Number},
    username:{type: String, required: true, unique: true},
    role:{type: String, default: 'admin', enum: ['admin', 'secretary']}
  },
  {
    timestamps:true,
    toJSON:{
      virtuals:true,
    },
    toObject:{
      virtuals: true,
    },
  },
);

export const UserModel = model('users', UserSchema);

