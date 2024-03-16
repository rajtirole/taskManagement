import  {Router} from "express";
import upload from '../middlewares/multer.middleware.js';
import {getCourses,getLectures,createCourse,updateCourse,deleteCourse,createLecture,updateLecture,deleteLecture} from '../controller/course.js'
import auth from "../middlewares/user.auth.js";
import authorization from "../middlewares/courseauth.js";
// import authorization from '../middlewares/'
const router =new Router();
// router.get('/', getCourses)
router.route('/').get(getCourses).post(auth,authorization,upload.single('thumbnail'),createCourse)
// router.route('/').get(getCourses).post(auth,authorization,upload.single('thumbnail'),(req,res)=>{console.log("lkjjkjkjkfjdslfasf",req.file);},createCourse)
router.route('/:id').get(auth,getLectures).post(auth,authorization,upload.single('lecture'),createLecture).put(auth,authorization,updateLecture).delete(auth,authorization,deleteLecture)  
// router.get('/:id',auth, getLectures)
export default router;

// // 
// _id
// 6513dc89e0aa9a15f34c5e4f
// fullName
// "name is name2"
// email
// "e@mail.cdom"
// password
// "password is pass"

// avatar
// Object
// role
// "USER"
// createdAt
// 2023-09-27T07:40:57.024+00:00
// updatedAt
// 2023-09-27T07:40:57.024+00:00
// __v
// 0
