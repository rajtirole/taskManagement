import exp from 'constants';

import { config } from 'dotenv'
config();
import jwt from 'jsonwebtoken'
import AppError from '../utils/error.utils.js';
async function auth(req,res,next){
    // console.log('requefajksdfjjsd',req);
    // console.log(req.body);
    try {
        const { token } =req.cookies;
        console.log('auth token',token)
        
        if(!token){
            return next(new AppError('not authenticated user',400))
        }
        // console.log(process.env.JWT_SECRET);
        const userr=await jwt.verify(token,process.env.JWT_SECRET)
        
        req.user=userr
        next();
        
    } catch (error) {
        if(!req.user){
            return next(new AppError(`not valid token`,400))
        }
            return next(new AppError(`eror in jwt`,400))
            // return next(new AppError);
        
    }
   
}

export default auth