import{Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import crypto from 'crypto';
config();
const dashboardSchema = new Schema({
    quizName:{
        type: 'string',
        required: [true, 'name is required'],
        trim:true
    },
    updated: { type: Date, default: Date.now },

    impression: {
        type: Number, 

    },
    quizType: {
        type: 'string',
        default:'NA'
    },
    options:{
        options1:{
           text:{ type: 'string'},
           optionimage:{ type: 'string'},
        },
        options2:{
            text:{ type: 'string'},
            optionimage:{ type: 'string'},
        },
        options3:{
            text:{ type: 'string'},
            optionimage:{ type: 'string'},
        },
        options4:{
            text:{ type: 'string'},
            optionimage:{ type: 'string'},
        }
    },
    avatar:{
        public_id: {
            type: 'string',
        },
        secure_url:{
            type: 'string',
        }
    },
    role:{
        type: 'string',
        enum: ['USER', 'ADMIN'],
        default:'USER'
    },
    subscriptions:{
        type:'boolean'
    },
    forgotPasswordToken:String,
    forgotPasswordExpires:Date
    // timestamps:true,
},
{
    timestamps:true
});
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)

})
// userSchema.methods={
//     generateJWTToken:async function (){
//         return await jwt.sign({
//             id:this._id,
//             email:this.email,
//             subscription:this.subscription,
//             role:this.role
//         },
//         process.env.JWT_SECRET,
//         {
//         expiresIn:process.env.JWT_EXPIRY
//         }
//         )

//     },
//     comparePassword: async function(plainPassword){
//         // console.log(plainPassword);
//         // console.log(this.email);
//         return await bcrypt.compare(plainPassword, this.password)
//     },
//     generatePassToken:async function(){
//         const token=crypto.randomBytes(20).toString('hex')
//         this.forgotPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
//         this.forgotPasswordExpires = Date.now()+ 15*60*1000;
//         return token;
//     }   
// }
const Dashboardmodel=model('dashboard',dashboardSchema)
export default Dashboardmodel;