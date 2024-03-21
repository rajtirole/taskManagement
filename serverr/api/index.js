import express from 'express'
import { config }from 'dotenv'
import db from './config/dbConnection.js'



// import { config } from 'dotenv'
// import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import erroMiddleware from './middlewares/error.middleware.js'
import userRoutes from './routes/user.routes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

import  course from './routes/course.js'
import formidable from  'express-formidable';



import taskRoutes from './routes/usertask.js'
// import app from './index.js'


// import app from './app.js'
config();
const allowedOrigins= ["http://localhost:3000","http://localhost:300",process.env.FRONTEND_URL];
const app = express();
const PORT=process.env.PORT||5300
console.log(PORT);
app.listen(PORT,async()=>{  
    await db()
    console.log(`app listen on ${PORT}`);
})
app.get("/", (req, res) => res.send("Express on Vercel"));

app.get('/test',(req,res)=>{
    res.status(200).json({
        success: true,
        message: 'test server',
      });
})
console.log(process.env.FRONTEND_URL);
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000",process.env.FRONTEND_URL]
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended:true }))    
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser())
app.use(morgan('dev')) 

app.get('/ping',(req,res)=>{
    res.send('pong server');
    
})
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/dashboard',dashboardRoutes)
app.use('/api/v1/taskroutes',taskRoutes)
app.all('*',(req,res)=>{
    res.status(500).send('page not have any')
    
})
app.use(erroMiddleware)
// app.listen(5000, () => console.log("Server ready on port 3000."));


export default app;


// export default app;