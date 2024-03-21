import { timeStamp } from "console";
import { model,Schema, } from "mongoose";
const courses=new Schema({
    title:{
        type:String,
        required:[true, 'title is required'],
        minLength:[8,'title must be at least 8 characters'],
        maxLength:[50,'title must be at least 50 characters'],
    },
    description:{
        type:String,
        required:[true, 'description is required'],
        minLength:[8,'description must be at least 8 characters'],
        maxLength:[50,'description must be at least 50 characters'],
    },
    category:{
        type:String,
        

    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                },
                secure_url:{
                    type:String
                }
            }
        }
    ],
    thumbnail: {
        public_id:{
            type: String
        },
        secure_url:{
            type:String
        }

    },
    numberOfLecture:{
        type:String
    },
    create:{
        type:String
    }
    
    
},{
timeStamps:true})
const Course=model('Course', courses)
export default Course;