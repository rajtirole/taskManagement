import{ Router} from 'express'
import {getDashboardData} from '../controller/dashboard.controller.js'
import auth from '../middlewares/user.auth.js';
const router=Router();

router.get('/getDashboardData',auth,getDashboardData)



router.post('/getDashboardData',()=>{
    console.log('dashboard');
})

export default router;