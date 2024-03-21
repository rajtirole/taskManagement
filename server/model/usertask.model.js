import{Schema,model} from 'mongoose'
import { config } from 'dotenv';
import { type } from 'os';
config();
const UsertaskSchema = new Schema(
    {
        userid:{
            type: 'string',
        },
        backlog:{
            backlogtask:[Schema.Types.Mixed],
        },
        todo:{
            todotask:[Schema.Types.Mixed],
        },

        inprogress:{
            inprogresstask:[Schema.Types.Mixed],
        },
        done:{
            donetask:[Schema.Types.Mixed],
        }
    },
    {strict: false},
{
    timestamps:true
});
UsertaskSchema.pre('save', function(next){
    
    // if(!this.isModified('password')){
    //     return next();
    // }
    console.log('save funcion');
    return next();
})

const Usertaskmodel=model('usertask',UsertaskSchema)
export default Usertaskmodel;