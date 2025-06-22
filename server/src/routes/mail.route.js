import { Router } from 'express';
import {mail} from '../controller/mail.controller.js'


const router = Router();

router.post('/mail', mail)




export default router;