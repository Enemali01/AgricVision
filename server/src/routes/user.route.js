import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { Picture } from "../models/profile.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BAD_REQUEST } from "../constants/httpStatus.js";
import { login, signup, verify, changePassword,logout } from "../controller/userController.js";
import route from "./fileupload.route.js";
import verifyUser from "../middleware/authMiddleware.js";



const router = Router();

router.post('/register', async (req,res) => {
  const {firstname, lastname, email, password, username} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
          res.json('exist');
          return;
          }
        const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS
        );
        const newUser ={
          firstname,
          lastname,
          email: email.toLowerCase(),
          password: hashedPassword,
          username
        };
        const result = await UserModel.create(newUser);
        if(result){
          res
        }
        res.send(generateTokenResponse(result));
    })

  
const generateTokenResponse = user => {
  const token = jwt.sign(
    {
      id: user.id,
      email:user.email,
      isAdmin: user.isAdmin,
  }, 
  process.env.JWT_SECRET,
  {
    expiresIn: '30d',
  }
  );

  return{
    id: user.id,
    email:user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    isAdmin: user.isAdmin,
    token,
  }


};

// router.post('/login', async(req,res) =>{
//   const {username, password} = req.body
//    const user = await UserModel.findOne({username})
//    if(user && (await bcrypt.compare(password, user.password))){
//     res.send(generateTokenResponse(user)).json();
//     // res.json.send('Welcome')
//     return;
//    }
//    res.json('Wrong Username and Password')
// });

router.get('/logout/:id', async(req,res) =>{
  res.clearCookie('token');
    try {
      const logoutUser = {
        username,
        password,
       }
       if(logoutUser){
        res.json('success')
       }else{
        res.json('Bad request')
       }
    } catch (error) {
      res.json(error);
    }
})

route.get('/getUser', async(req,res)=>{ 
   try {
    const id = req.params._id;
      const userExist = await UserModel.findOne(id);
        return res.send(userExist);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
    // try {
    //     const members = await Members.find()
    //     res.send(members);
    //   } catch (error) {
    //     console.log(error)
    //   }
})

// Profile picture
route.post('/uploadProfile', async(req,res) =>{
  const body = req.body;
  try {
    const newProfile = await Picture.create(body)
    newProfile.save();
    res.status(200).json({message:'Uploaded'})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})
// Get Profile picture
route.get('/getProfile', (req,res)=>{
  try {
    Picture.find()
    .then(data =>{
      res.json(data)
    .catch(error =>{
      res.status(408).json({error})
    }) 
    })
  } catch (error) {
    res.json({error})
  }
})

router.post('/signup', signup );
router.post('/login', login );
router.post('/logout', logout);
router.get('/verify', verifyUser, verify);
router.put('/change-password',verifyUser, changePassword );



export default router;
