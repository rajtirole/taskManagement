import { config }from 'dotenv'
import db from './config/dbConnection.js'
config();
import app from './app.js'
import cloudinary from 'cloudinary'
cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
const PORT=process.env.PORT||5300
console.log(PORT);
app.listen(5400,async()=>{  
    await db()
    console.log(`app listen on ${PORT}`);
})
app.get('/test',(req,res)=>{
    res.status(200).json({
        success: true,
        message: course,
      });
})
export default app;
// import express from 'express'
// const app = express();

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(5000, () => console.log("Server ready on port 3000."));

// export default app;