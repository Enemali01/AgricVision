import { Posts } from "../models/post.model.js";
import streamifier from 'streamifier'
import cloudinary from "../middleware/cloudinary.js";

export const createPost = async(req, res) =>{
  try {
    let fileArray = []
    req.files.forEach(element => {
      const bfile = {
        fileName:element.originalname,
        filePath:element.path.replace(/\\/g,'/'),
        fileType:element.nimetype,
        fileSize: fileSizeFormatter(element.size,2)
      }
      fileArray.push(bfile);
  });
   const blogfile = new Posts({
    title:req.body.title,
    description:req.body.description,
    files: fileArray,
   });
   await blogfile.save();
    // console.log(blogfile);
    res.json({message:'File Uploaded Successfully'});


  } catch (error) {
    console.log(error)
  }

}


export const displayPost = async(req,res)=>{
  try {
     const posts = await Posts.find();
    res.status(200).json({ message: true, posts })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export const delPost = async(req,res) => {
  try {
    const { id } = req.params;
    const deleBlog = await Posts.findByIdAndDelete(id);
    if(!deleBlog){
      return res.json({message:'Oops, Something Went Wrong'})
    };
    return res.json({message:'Post Delete Successfully'})
  } catch (error) {
    console.log(error)
  }
}

export const getPostById = async (req,res) => {
  try {
    const id = req.params.id;
    const postId = await Posts.findById(id);
    if(!postId){
      return res.status(404).json({message:'Not Found'});
    }
    // const updatePost = await Posts.findOneAndUpdate(id, req.body, req.files, {new: true})
    res.status(200).json(postId)
    // console.log(postId)
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
   
};

export const editPost = async(req,res) => {
  try {
    const id = req.params.id
    const {title, description, tags, file} = req.body;
    const updatePost = await Posts.findByIdAndUpdate(id, req.body, 
      {
        new: true
      });
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}


export const newPost = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const file = req.file; 

    if (!file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'agricVision',
    });

    // Parse tags string into array (trim, remove empty)
    const tagsArray = tags
      ? tags.split(/[,\s]+/).map((tag) => tag.trim()).filter(Boolean)
      : [];

    // Create the post in DB
    const post = new Posts({
      title,
      description,
      tags: tagsArray,
      file: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id, // save public_id to delete later if needed
      createdAt: new Date(),
    });

    await post.save();

    res.status(200).json({ message: 'Post created', post });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// const uploadToCloudinary = (fileBuffer, folder) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
//       if (result) resolve(result);
//       else reject(error);
//     });
//     streamifier.createReadStream(fileBuffer).pipe(stream);
//   });
// };


export default {createPost, displayPost, delPost, getPostById, editPost, newPost};