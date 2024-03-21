import User from '../model/user.models.js'
import AppError from '../utils/error.utils.js';
const authorization = async (req,res,next)=>{
    try {
        const user =await User.findById(req.user.id)
    console.log(req.user.id);
    console.log(req.user.role);
    const currentRole=req.user.role;
    if(currentRole!=('ADMIN'||'USER')){
        return next(new AppError('you are not allowed ',400))
    }
    if(req.user.role=='USER'){
        console.log(' user');
        return next(new AppError('you are not allowed ',400))
        // next();
    }
    } catch (error) {
        return next(new AppError(error.message,400))
        
        
    }
    
    next()

}
export default authorization;