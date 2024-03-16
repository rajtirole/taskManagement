const errorMiddleware=(err,req,res,next) => {
    err.stausCode=err.stausCode||500;
    err.message=err.message||'something went wrong!'
    res.status(err.stausCode).json({
        success:false,
        message:err.message,
        stack:err.stack
    })

}
export default errorMiddleware;