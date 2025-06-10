import mongoose, {connect, set} from "mongoose";
import {users} from '../user.js'
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();


set('strictQuery', true);

export const dbconnect = async () => {
    connect(process.env.DB_URI, {
      useNewUrlParser:true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected")
    })
    .catch((error) => {
      console.log(error)
    })
}


export const connectDB = async () => {
  connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    console.log('DB Connected')
  })
  .catch((error) =>{
    console.log(error)
  })
}


const seedUsers = async () => {
  await mongoose.connect(process.env.DB_URI);
  await UserModel.deleteMany();

  for (let user of users) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await UserModel.create(user);
  }

  console.log('Users seeded');
  // process.exit();
};

 seedUsers();

