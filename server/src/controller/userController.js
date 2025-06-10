import express from "express";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt'

const PASSWORD_HASH_SALT_ROUNDS = 10;

export const login = async(req,res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({success: false, message: 'Invalid Credentials'})
    }
    const user = await UserModel.findOne({email})
    if(!user){
      return res.status(401).json({success:false, message: 'User with this email does not exist'})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({success:false, message:'Invalid Password'})
    }

    const token = jwt.sign({_id:user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '5d'});
    //  res
    //   .status(200)
    //   .json({
    //     token, 
    //     user: {_id: user._id, firstname: user.firstname, role: user.role },message:'Login Successful'
    //   });

      res
.cookie('token', token, {
 httpOnly: true,
 secure: process.env.BASE_URL === 'production', 
 sameSite: 'Strict',
 maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
})
 .status(200)
 .json({
 user: {
 _id: user._id,
 firstname: user.firstname,
 role: user.role
 },
 message: 'Login Successful'
});
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Server Error', error: error.message})
  }
}


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Invalid Credentials' });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'User with this email does not exist' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid Password' });
//     }

//     const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5d' });

//     // Set token in HTTP-only cookie
//     res
//       .cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production', 
//         sameSite: 'Strict',
//         maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
//       })
//       .status(200)
//       .json({
//         user: {
//           _id: user._id,
//           firstname: user.firstname,
//           role: user.role
//         },
//         message: 'Login Successful'
//       });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };


export const signup = async(req,res) => {
  try {
  const {lastname,firstname,email, password,phone,confirmedPassword, role, token} = req.body;
    if(!lastname || !firstname || !email || !password || !phone){
      return res.status(400).json({success:false, error: 'Please fill all fields'})
    }
    if(password.length < 6){
       return res.status(400).json({success:false, error: 'Password just be atleast 8 character length with a special charater in it'})
    }

    if(confirmedPassword !== password){
       return res.status(400).json({success:false, error: 'Password does not match, Try Again!'})
    }
    const user = await UserModel.findOne({email})
      if(user){
        return res.status(201).json({success:false, error: 'User with email exist'})
      }
       const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS
         );
         const newUser ={
           lastname,
           firstname,
           email: email.toLowerCase(),
           password: hashedPassword,
           username,
           phone,
           token,
           role,
         };
         await UserModel.create(newUser);
         res.status(200).json({message: 'Registration completed!', success: true, generateTokenResponse});
  } catch (error) {
    
  }
}


 const generateTokenResponse = user => {
   const token = jwt.sign(
     {
       _id: user._id,
       role: user.role,
   }, 
   process.env.JWT_SECRET,
   {
     expiresIn: '30d',
   }
   );
 
   return{
     id: user.id,
     lastname:user.lastname,
     firstname: user.firstname,
     username: user.username,
     email: user.email,
     phone: user.phone,
     token,
     role:user.role,
   }
 };

export const verify = async (req,res) => {
  return res.status(200).json({success: true, user: req.user})
}


export const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'New password and confirmation do not match.' });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and contain at least one letter and one number.',
    });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ success: true, message: "Logged out successfully" });
};


export default {login, signup, verify, changePassword, logout};