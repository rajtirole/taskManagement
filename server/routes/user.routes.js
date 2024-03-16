import{ Router} from 'express'
import upload from '../middlewares/multer.middleware.js';
import auth from '../middlewares/user.auth.js'
import{ register,login,logout,forgot,reset,changePassword,updateProfile,getdata} from '../controller/user.controller.js'
// import { reset } from 'nodemon';
const router=Router();
// console.log("rotuter");

// router.post('/register',() => {
//     console.log("reffkjlsjflaks");
// })
router.get('/register',register)
router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/getdata',auth,getdata)
// router.get('/me',auth,getProfile)
router.post('/forgot',forgot)
// router.post('/forgot',(req,res) =>{
// console.log('flakjsdlkfjasldkfjsdlkfjsd');
// console.log(req.body);
// })
// router.post('/reset',reset)
// router.post('/reset',reset)
router.post('/reset',reset)
router.post('/changePassword',auth,changePassword)
router.post('/updateProfile',auth,upload.single('avatar'),updateProfile)
    export default router;