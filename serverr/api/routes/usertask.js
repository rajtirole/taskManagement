import{ Router} from 'express'
import upload from '../middlewares/multer.middleware.js';
import auth from '../middlewares/user.auth.js'
import{ register,login,logout,forgot,reset,changePassword,updateProfile} from '../controller/user.controller.js'
// import { reset } from 'nodemon';
import { todotask ,gettodotask,getuserdata,updatetodotask,deletetodotask,getuserdataa} from '../controller/task.controller.js';
const router=Router();
router.post('/todo', auth,todotask)
// router('/todo', auth,todotask)
router.put('/todo', auth,updatetodotask)
// router.delete('/todo', auth,()=>{
//     console.log('flkjasldkfjsdlkfjsdlkfjlkj');
// })
router.delete('/todo', auth,deletetodotask)

router.get('/todo', auth,gettodotask)
router.get('/getuserdata', auth,getuserdata)
router.post('/getuserdata', auth,getuserdataa)
export default router;