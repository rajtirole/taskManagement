import React , {useState,} from 'react'
import { useEffect } from 'react';
import TodoStyle from './TodoStyle.css'
import CollapImage from './image/collap.png'
import plusImage from './image/Group 10.png'
import Modal from './Modal'
import './Divstyle/Divstyle.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Todo() {
  const [data,setdata]=useState([])
  const navigate =useNavigate();
  const [modalopen,setmodalopen]= useState(false)
//   useEffect(async()=>{
//     try {
//       let res=await axios.get('http://localhost:5400/api/v1/taskroutes/todo').then((res)=>{
// }).catch(err=>{
//   console.log(err);
// })
      
//     } catch (error) {
//       console.log(error);
      
//     }
//   },[])
// useEffect(async function (){},[])


useEffect(() => {
  async function todo(){
  console.log('useffecgjsdlkfjalskjflk');
  try {
    let res= axios.get('http://localhost:5400/api/v1/taskroutes/todo', { withCredentials: true }).then((res)=>{
      console.log(res);
      
      setdata(res.data.data)
      console.log(data.length);
     
}).catch(err=>{
console.log(err);
})
    
  } catch (error) {
    console.log(error);
    
  }
 
}
todo();
}, []);
// let arr=data.data.data;
console.log(data);
   const handlechge = ()=>{
    setmodalopen(true);
   }
   const closemodal=()=>{
    setmodalopen(false);
   }
  
  return (
    <>
    <div className='todo' style={{display:'flex',flexDirection:'column'}} >
      <div style={{display:'flex'}}>
        
     <div> <h5 className='heading'>To      do</h5></div>
     <div className='plus'  onClick={handlechge}> <img src={plusImage}/></div>
     {modalopen &&<Modal  oncancel={closemodal}/> }
      <div className='collap' ><img  src={CollapImage}   /></div>
      <div>
      
       
      </div>
      </div>
      {/* <TodoCard></TodoCard> */}
    
      <div  style={{display:'flex',flexDirection:'column'}}>
    {Object.keys(data).length>0&&data.map((ele,index)=>{
      console.log();
      return (<> 
      <div className='todoo' key={index}>
      <p>
          {`${ele.priority}`}
        </p>
        <h3>
        {`${ele.taskTittle}`}
        </h3>
        <p>
          {`checklist :${ele.checklist}`}
        </p>
        <p>
          {`date : ${ele.date}`}
        </p>
        
      </div>
      </>)
    })
    
    }
    
    </div>
    </div>
    
    </>
  )
}
