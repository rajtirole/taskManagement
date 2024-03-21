import { config } from 'dotenv'
config();
import mongoose from "mongoose";
// console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery',false);
const connectionToDB=async()=>{
    try {
        const { connection }=await mongoose.connect(process.env.MONGODB_URL||`mongodb://127.0.0.1:27017/lms`)
        if(connection){
            console.log(`coonected to connect to ${connection.host}`);
            // console.log(`coonected to connect to ${connection.host},${process.env.MONGODB_URL}`);
        }
       
    } catch (error) {
        console.log(error.message,'kfaslkdj');
        process.exit(1)
        
    }
      
}
export default connectionToDB;
