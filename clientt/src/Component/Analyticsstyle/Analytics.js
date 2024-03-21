import React, { useEffect } from 'react'
import './Analyticsstyle.css'
import axios from 'axios'

export default function Analyticss() {
   
   // useEffect(()=>{
   //   try {
   //    let dataa={}
   //    let res = axios.post('http://localhost:5400/api/v1/taskroutes/getuserdata',dataa,{withCredentials:'true'}).then((res)=>{
   //       console.log(res);
   //       if(res){
   //       //   setdata(res.data.user)
   //         console.log(dataa);
   //       }
   //       })
   //   } catch (error) {
   //    console.log(error);
   //   }
   // })
  return (
    <div  className='analytics'>
      <h1> Analytics </h1>
      <div className='main'>
      <div className='first'>
      <div className='divset'>
        <div className='circale'></div>
        <div className='text'> Backlog</div>
        <div className='text2'>8</div>
     </div>
     <div className='divset'>
        <div className='circale'></div>
        <div className='text'> To Do</div>
        <div className='text3'>8</div>
     </div>
     <div className='divset'>
        <div className='circale'></div>
        <div className='text'> In Progres</div>
        <div className='text4'>8</div>
     </div>
     <div className='divset'>
        <div className='circale'></div>
        <div className='text'> Done</div>
        <div className='text5'>8</div>
     </div>
     </div>
     <div className='second'>
      <div className='divset'>
        <div className='circale'></div>
        <div className='text'> Low Priority</div>
        <div className='text2'>8</div>
     </div>
     <div className='divset'>
        <div className='circale'></div>
        <div className='text'> Moderate Priority</div>
        <div className='text6'>8</div>
     </div>
     <div className='divset'>
        <div className='circale'></div>
        <div className='text'> High Priority</div>
        <div className='text7'>8</div>
     </div>
     <div className='divset'>
        <div className='circale'></div>
        <div className='text'> Due Date Task</div>
        <div className='text8'>8</div>
     </div>
     </div>
    
     </div>
      
    </div>
  )
}
