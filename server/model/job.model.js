import{Schema,model} from 'mongoose'
import { config } from 'dotenv';
import { type } from 'os';
config();
const UsertaskSchema = new Schema(
    {
        userid:{
            type: 'string',
        },
        name:{
            type: 'string',
        },
        skills:{
            type:Array
        },
        loation:{
            type: 'string',
        }
        
    },
    {strict: false},
{
    timestamps:true
});


const Usertaskmodel=model('usertask',UsertaskSchema)
export default Usertaskmodel;