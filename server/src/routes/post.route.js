import {Router} from 'express'
import upload from "../helpers/helpers.js";
import {createPost, displayPost, delPost, getPostById, editPost, newPost} from '../controller/postController.js'
import verifyUser from '../middleware/authMiddleware.js';


const route = Router();

route.post('/posts', upload.single('file'),verifyUser, newPost);
// route.post('/post', upload.array('files'),createPost);
route.get('/getPost', displayPost);
route.delete('/deletPost/:id', verifyUser, delPost);
route.get('/posts/:id', getPostById)
route.put('/update/:id', verifyUser, editPost)

export default route