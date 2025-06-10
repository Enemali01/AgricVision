import { Router } from "express";
import {createMember, deleteMember, getMember,getUserById, updateMember} from "../controller/member.controller.js";
import verifyUser from "../middleware/authMiddleware.js";


const router = Router();


router.post('/member', createMember);
router.get('/getMember', verifyUser, getMember);
router.get('/member/:id', getUserById);
router.delete('/remove/:id', verifyUser, deleteMember);
router.put('/update/:id', verifyUser,updateMember);

export default router;


