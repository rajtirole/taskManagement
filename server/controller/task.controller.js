import { config } from "dotenv";
config();
import AppError from "../utils/error.utils.js";
import Usertaskmodel from "../model/usertask.model.js";
import { nanoid } from 'nanoid'

async function backlogtask(req,res,next){

   try {
   
    const{taskTittle,priority,date,checklist}=req.body;
    if (!taskTittle) {

        return next(
          new AppError("All fields are required", 400)
        );
      }
    console.log(taskTittle,priority,date,checklist);
    const id = req.user.id;

    console.log(id);
    const user = await Usertaskmodel.findOne({userid:id})
    console.log(user);
    if(!user){
        const usertask=Usertaskmodel.create({
            userid:id,
            backlog:{
                backlogtask:[{taskTittle,priority,date,checklist,idd}]
            }
        })
        res.status(200).json({
            success: true,
            message: "backlog task create succesfully",
            user,
          });
    }
    // res.cookie("token", token, cookieOptions);
    let backlogtaskarr= user.backlog.backlogtask
    console.log('backlogarr',backlogtaskarr);
    user.backlog.backlogtask=[...backlogtaskarr,{taskTittle,priority,date,checklist}]
    console.log( 'user backlogtask',user.backlog.backlogtask);
    await user.save();
    res.status(200).json({
        success: true,
        message: "backlog task updated succesfully",
       
      });
   } catch (error) {
    console.log(error);
    
   }

}
async function todotask(req,res,next){ 

   try {
   console.log('toskfkjflaksjd');
    const{taskTittle='task title',priority='HIGH',date="2024-03-22",checklist=["checklist"],task='todo',taskid="taskid"}=req.body;
    // console.log(task);
    
    const id = req.user.id;
    // console.log(id);
    const idd=nanoid();
    // console.log(taskTittle,priority,date,checklist,task,taskid,id,idd);

    const user = await Usertaskmodel.findOne({userid:id})
    // console.log('jsdklfja',idd);
    console.log(user);
    if(!user){
   
        const usertask=Usertaskmodel.create({
            userid:id,
            todo:{
                todotask:[{taskTittle,priority,date,checklist,task,id:idd}]
            }
        })
        // await usertask.save()
        // const id = req.user.id;
    // console.log(id);
    const data = await Usertaskmodel.findOne({userid:id})
        res.status(200).json({
            success: true,
            message: "todo task user create succesfully",
            data,
          });



      // if()

      // let userdata=user.todo.todotask;
      // console.log(userdata);

    }
    // res.cookie("token", token, cookieOptions);
    else {
      let todotaskarr= user.todo.todotask
    // console.log('todotaskarr',todotaskarr);
    user.todo.todotask=[...todotaskarr,{taskTittle,priority,date,checklist,id:idd,task}]
    // console.log( 'user todotaskarr',user.todo.todotask);
    // console.log('jsdklfja',idd);

    await user.save();
    const data = await Usertaskmodel.findOne({userid:id})
    res.status(200).json({
        success: true,
        message: "todo task created succesfully",
        data: data
       
      });
    }
   } catch (error) {
    console.log(error);
    
   }

}
async function gettodotask(req,res,next){
  

  try {
   
    const id = req.user.id;
    console.log(id);
    const user = await Usertaskmodel.findOne({userid:id})
    if(!user){
        
        res.status(200).json({
            success: false,
            message: "no todo task",
            data:false,
          });
    }
    console.log('userjhkjdfa',user);

    res.status(200).json({
        success: true,
        message: "todo task",
        data: user.todo.todotask
       
      });
   } catch (error) {
    console.log(error);
    
   }


}
async function updatetodotask(req,res,next){
  const {priority,date,checklist,task,taskid,checklistt}=req.body;
console.log('update todo task fkjskldj');
console.log(checklistt,checklist);
  try {

    if(!taskid){
      res.status(200).json({
        success: false,
        message: "task id need for task updation",
        data:false,
      });
     }
    const id = req.user.id;
    // console.log(id);
    const user = await Usertaskmodel.findOne({userid:id})
    if(!user){
        
        res.status(200).json({
            success: false,
            message: "no todo task found",
            data:false,
          });
    }
    let todoarr=user.todo.todotask;
    // let arr={};
    console.log('fjkaksdfkjjsdlkf',todoarr);
    let todoarrr=todoarr.map((ele,index)=>{
      console.log('jflkasdjf',ele.checklist);
      if(ele.id==taskid){
        if(priority){
          return {taskTittle:ele.taskTittle,priority:priority,date:ele.date,checklist:ele.checklist,task:ele.task,id:ele.id}
        }
        if(date){
          return {taskTittle:ele.taskTittle,priority:ele.priority,date:date,checklist:ele.checklist,task:ele.task,id:ele.id}
        }
        if(checklistt){
          return  {taskTittle:ele.taskTittle,priority:ele.priority,date:ele.date,checklist:[...checklist],task:ele.task,id:ele.id}
        }
        // if(checklist){
        //   if(checklist.length>0){
        //     console.log('checklistfsdf');
        //   return {taskTittle:ele.taskTittle,priority:ele.priority,date:ele.date,checklist:checklist,task:ele.task,id:ele.id}

        //   }
        // }
        if(task){
          return {taskTittle:ele.taskTittle,priority:ele.priority,date:ele.date,checklist:ele.checklist,task:task,id:ele.id}
        }
      }
      return ele;
      // if(ele.id==taskid){
      //   // console.log(ele);
      //   let arr;
      //   if(priority){
      //   const a=async ()=>{
      //     console.log(user.todo.todotask[index].priority);

      //     // console.log();
      //     user.todo.todotask=[...todoarr];
      //     await user.save();
      //   }
      //   a();
      //   }
      //   res.status(200).json({
      //     success: true,
      //     message: "todo task updated succesfully ",
      //     // data: user.todo.todotask
         
      //   });
      // }

    })
    console.log(todoarrr);
    // console.log(todoarr);
    // if(ele.id==taskid){
      //   // console.log(ele);
      //   let arr;
      //   if(priority){
      //   const a=async ()=>{
      //     console.log(user.todo.todotask[index].priority);

      //     // console.log();
          user.todo.todotask=[...todoarrr];
          await user.save();
      //   }
      //   a();
      //   }
      const data = await Usertaskmodel.findOne({userid:id})
        res.status(200).json({
          success: true,
          message: "todo task updated succesfully ",
          data: data
         
        });
      // }
      // if(priority){
      //   console.log('arrfjasldkjf',arr);
      // }
    // console.log(todoarrr);

    // res.status(200).json({
    //     success: true,
    //     message: "todo task",
    //     data: user.todo.todotask
       
    //   });
   } catch (error) {
    console.log(error);
    
   }


}
async function deletetodotask(req,res,next){
  console.log('detlefkljasdlkjfd');
  const {taskid}=req.body;
  try {

    if(!taskid){
      return res.status(200).json({
        success: false,
        message: "task id need for task ",
        data:false,
      });
     }
    const id = req.user.id;
    // console.log(id);
    // const user = await Usertaskmodel.findOne({'id':'FECUj_un1nXclmw4Ok5ZL'})

    // const user = await Usertaskmodel.find( {'todo.todotask':{ $elemMatch: { id: 'FECUj_un1nXclmw4Ok5ZL' } }},{ $pull: { todotask: { id: "FECUj_un1nXclmw4Ok5ZL" } } });
    const user=await Usertaskmodel.findOneAndUpdate({userid:id},{ $pull:{'todo.todotask':{id:taskid}}})
   console.log(user);
    // const user = await Usertaskmodel.findOne({userid:id}).select('todo').find({'todotask': {$elemMatch: {id: 'FECUj_un1nXclmw4Ok5ZL'}}})
    // const user = await Usertaskmodel.findOne({userid:id}).select('todo.todotask').find({'id':"FECUj_un1nXclmw4Ok5ZL"})
    console.log('afsdjlafksjdfl',user);
    // if(!user){
        
    //     res.status(200).json({
    //         success: false,
    //         message: "no todo task found",
    //         data:false,
    //       });
    // }
    return res.status(200).json({
      success: true,
      message: "todo task success",
      data: user
     
    });
    // let todoarr=user.todo.todotask;
    // let arr={};
    // console.log('fjkaksdfkjjsdlkf',todoarr);
    // let todoarrr=todoarr.map((ele,index)=>{
    //  if(ele.id==taskid){

    //  }
      
      // return ele;
      // if(ele.id==taskid){
      //   // console.log(ele);
      //   let arr;
      //   if(priority){
      //   const a=async ()=>{
      //     console.log(user.todo.todotask[index].priority);

      //     // console.log();
      //     user.todo.todotask=[...todoarr];
      //     await user.save();
      //   }
      //   a();
      //   }
      //   res.status(200).json({
      //     success: true,
      //     message: "todo task updated succesfully ",
      //     // data: user.todo.todotask
         
      //   });
      // }

    // })
    // console.log(todoarrr);
    // console.log(todoarr);
    // if(ele.id==taskid){
      //   // console.log(ele);
      //   let arr;
      //   if(priority){
      //   const a=async ()=>{
      //     console.log(user.todo.todotask[index].priority);

      //     // console.log();
      //     user.todo.todotask=[...todoarrr];
      //     await user.save();
      //   }
      //   a();
      //   }
      // const data = await Usertaskmodel.findOne({userid:id})
      //   res.status(200).json({
      //     success: true,
      //     message: "todo task updated succesfully ",
      //     data: data
         
      //   });
      // }
      // if(priority){
      //   console.log('arrfjasldkjf',arr);
      // }
    // console.log(todoarrr);

   
   } catch (error) {
    console.log(error);
    
   }


}
const getuserdata=async (req,res,next)=>{
  console.log('getlkjafsdkjfldsj');
  try {
   
    const id = req.user.id;
    console.log('user id jkalskdjflk',id);
    const user = await Usertaskmodel.findOne({userid:id})
    if(!user){
        
       return res.status(200).json({
            success: false,
            message: "no user data found",
            data:false,
          });
    }

    else if(user.todo.todotask.length<=0){
    console.log('userjhkjdfa');

      return res.status(200).json({
        success: false,
        message: "user task not found",
        data: false,
       
      });
    }
     return res.status(200).json({
      success: true,
      message: "user todo task",
      data: user
     
    });
   } catch (error) {
    console.log(error);
    
   }


}
const getuserdataa=async (req,res,next)=>{
  console.log('get  fdlfalksdmflkjafsdkjfldsj');
  try {
   
    const id = req.user.id;
    // console.log('user id jkalskdjflk',id);
    const user = await Usertaskmodel.findOne({userid:id})
    if(!user){
        
       return res.status(200).json({
            success: false,
            message: "no user data found",
            data:false,
          });
    }

    else if(user.todo.todotask.length<=0){
    console.log('userjhkjdfa');

      return res.status(200).json({
        success: false,
        message: "user task not found",
        data: false,
       
      });
    }
    let data={
      backlog:0,
      todo:0,
      progress:0,
      done:0,
      low:0,
      moderate:0,
      high:0,
      
    }
    user.todo.todotask.map((ele,index)=>{
      if(ele.task=='todo'){
          data.todo++;
      }
      else if(ele.task=='backlog'){
          data.backlog++;
      }
      else if(ele.task=='progress'){
          data.progress++;
      }
      else if(ele.task=='done'){
          data.done++;
      }
      if(ele.priority=='LOW'){
        data.low++;
      }
      else if(ele.priority=='HIGH'){
        data.high++;
      }
      else if(ele.priority=="MODRATE"){
        data.moderate++;
      }

    })
    console.log(data);
     return res.status(200).json({
      success: true,
      message: "user todo task",
      data: data
     
    });
   } catch (error) {
    console.log(error);
    
   }


}
export {backlogtask,todotask,gettodotask,getuserdata,updatetodotask,deletetodotask,getuserdataa}