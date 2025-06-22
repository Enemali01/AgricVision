import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import nodemailer  from 'nodemailer'
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars'
import mail from './routes/mail.route.js'
import users from './routes/user.route.js'
import uploads from './routes/fileupload.route.js'
import members from './routes/members.route.js'
import post from './routes/post.route.js'
import fs from 'fs'
import { dbconnect } from './dbConfig/dbConfig.js';
import bodyParser from 'body-parser';
import { Posts } from './models/post.model.js';
import cookieParser from 'cookie-parser';

// DB connection
dbconnect();

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());


const allowedOrigins = [
  'http://localhost:5173',
  'https://agricvision.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'PUT, POST, GET, DELETE, PATCH, HEAD'
}));



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname)
app.use('/public', express.static('public'));
app.use('upload', express.static(path.join(__dirname, 'public')));





// Routes api
app.use('/api/mail', mail);
app.use('/api/users', users);
app.use('/api/gallery', uploads);
app.use('/api/member', members);
app.use('/api/blog', post);

  
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'dist'); // or 'build' if CRA
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

