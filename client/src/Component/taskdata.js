import React, { useState,useContext, useEffect } from "react";
import "./taskdata.css";
import high from "../Component/image/Group 543.png";
import moderate from "../Component/image/Group 543 (1).png";
import low from "../Component/image/Group 543 (2).png";
import menu from "../Component/image/Group 544.png";
import cheklistdown from "../Component/image/Arrow - Down 2.png";
import checklisttttt from "../Component/image/Frame 1022.png";
import axios from 'axios'
import { id } from "choco";

const Taskdata = ({
  priority = "high",
  taskTittle = "tasktitle",
  checklist = [2, 3, 4, 6],
  checklistttt=false,
  getdata='',
  getdataa='',
  todo,
  backlog,
  progress,
  done,
  el,
  effect,
  seteffect,
  loading
}) => {
  // const user = useContext(UserContext);
    let [checklisttt, setchecklisttt] = useState('#ffff');
    const [checklistbox, setchecklistbox] = useState(false);
    const [dataaaa,setdataaaa]=useState();
    const [ele,setele]=useState(el);
    const [checklistt,setchecklistt]=useState(false)
    const [effectt,seteffectt]=useState(1)

    // console.log(seteffect);
  // console.log(seteffect);
  // console.log(effect);
 
    // if(todo){
    //   // setdataaaa(getdataa.todo)
    // }
    // console.log(dataaaa);
  // console.log(priority);
  if (ele.priority == "HIGH") {
    priority = <img src={high} />;
  } else if (ele.priority == "MODRATE") {
    priority = <img src={moderate} />;
  } else if ((ele.priority = "LOW")) {
    priority = <img src={low} />;
  }
  
//  if(checklistttt){
//     setchecklistbox(false)
//  }
  // const [checklist,setchecklist]=useState([1,2,3,4,5,6,7])
// console.log(getdata);
// console.log(getdataa);
// console.log(el);
console.log(ele);
// console.log(getdataa);
  return (
    effectt&&<div className="taskdata">
      <div className="box1">
        {priority}
       <div onClick={async()=>{
          
        setchecklistt(!checklistt)
        }}>
       {checklistt&&<button style={{backgroundColor:'#EEF2F5',border:'none',borderRadius:'2px',position:'relative',}} 
        onClick={async (e)=>{


          try {
            let data={
             
              taskid:ele.id,
              
            }
            // console.log(ele.id);
            let res =await  axios.delete('http://localhost:5400/api/v1/taskroutes/todo',{data:{taskid:ele.id},withCredentials:'true' }).then((res)=>{
              if(res){  
                // console.log(res);
              }
            })
            seteffect(!effect)
          } catch (error) {
            console.log(error);
          }
        }}>delete</button>}
       <img src={menu} />
       
       </div>
      </div>
      <div>
        <h3>{ele.taskTittle}</h3>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Checklist(0/{ele.checklist?ele.checklist.length:0})</h3>
          <img
            src={cheklistdown}
            onClick={() => {
              setchecklistbox(!checklistbox);
            }}
          />
        </div>
        {checklistbox && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {/* {(effect||checklisttt||!loading) */}
            
            {checklisttt&&ele.checklist.map((e, index) => {
              
              return (
               <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                    gap: "10px",
                    paddingRight: "5px",
                    border: "1px solid #E2E2E2",
                    borderRadius: "12px",
                  }}
                >
                  <div>
                    <img
                      src={checklisttttt}
                      style={{ borderRadius: "8px", margin: "2px",backgroundColor:'#ffff' }}
                      onClick={async(event) => {
              //           console.log(checklisttt);
              //           if (checklisttt == "#ffff") {
              //             setchecklisttt("blue");
              //             console.log(index);
              // console.log(e);
              // console.log(checklisttt);
              
              event.target.style.backgroundColor ='blue';
              let arr=ele.checklist.filter((e,i)=>{
                return i!=index;

              })
              // console.log(arr);
              try {
                // let taskid
                let data={
                  
                  taskid:ele.id,
                  checklist:arr,
                  checklistt:true
                  
                }
                let res=await axios.put('http://localhost:5400/api/v1/taskroutes/todo',data, { withCredentials: true }).then((res)=>{
                  if(res){
                    console.log(res);
                  }
                  seteffect(!effect)
                  seteffectt((prev)=>{
                    return prev+1;
                  })
                })
              } catch (error) {
                
              }
              //           } else {
              //             setchecklisttt("#ffff");
              //             console.log(checklisttt);
                         
                        //   event.target.style.backgroundColor = `${checklisttt}`;
                        // }
                        
                      }}
                    />
                  </div>
                  <div>
                    <p>{e}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* {true?():f} */}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "98%",
          marginTop:'20px',
          gap:'20px'
        }}
      >
        <div>
          <div
            style={{
              height: "30%",
              fontSize: "80%",
              backgroundColor: "#CF3636",
              borderRadius: "3px",
              color: "#ffff",
              padding: "2px 4px",
              fontWeight:'500',
              maxWidth:'100%',
              width:'100%'
            }}
          >
            {/* {ele.date} */}
            {ele.date}




          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "70%",
            
          }}
        >
          {!backlog&&<div
            style={{
              height: "10%",
              fontSize: "80%",
              backgroundColor: "#EEECEC",
              borderRadius: "3px",
              color: "#767575",
              padding: "2px 4px",
              fontWeight:'500',

          
              
            }} onClick={async()=>{
              try {
                // let taskid
                let data={
                  task:'backlog',
                  taskid:ele.id,
                  
                }
                let res=await axios.put('http://localhost:5400/api/v1/taskroutes/todo',data, { withCredentials: true }).then((res)=>{
                  if(res){
                    // console.log(res);
                  }
                  seteffect(!effect)
                })
              } catch (error) {
                
              }
            }}
          >
            {"Backlog"}
          </div>}
          {!progress&&<div
            style={{
              height: "10%",
              fontSize: "80%",
              backgroundColor: "#EEECEC",
              borderRadius: "3px",
              color: "#767575",
              padding: "2px 4px",
              fontWeight:'500',

              
            }} onClick={async()=>{
              try {
                let data={
                  task:'progress',
                  taskid:ele.id,
                  
                }
                let res=await axios.put('http://localhost:5400/api/v1/taskroutes/todo',data, { withCredentials: true }).then((res)=>{
                  if(res){
                    // console.log(res);
                  }
                  seteffect(!effect)
                })
              } catch (error) {
                
              }
            }}
          >
            {"progress"}
          </div>}
          {!todo&&<div
            style={{
              height: "10%",
              fontSize: "80%",
              backgroundColor: "#EEECEC",
              borderRadius: "3px",
              color: "#767575",
              padding: "2px 4px",
              fontWeight:'500',
              
            }} onClick={async()=>{
              try {
                let data={
                  task:'todo',
                  taskid:ele.id,
                  
                }
                let res=await axios.put('http://localhost:5400/api/v1/taskroutes/todo',data, { withCredentials: true }).then((res)=>{
                  if(res){
                    // console.log(res);
                  }
                  seteffect(!effect)
                })
              } catch (error) {
                
              }
            }}
          >
            {"todo"}
          </div>}
         {!done&&<div
            style={{
              height: "10%",
              fontSize: "80%",
              backgroundColor: "#EEECEC",
              borderRadius: "3px",
              color: "#767575",
              padding: "2px 4px",
              fontWeight:'500',
              
            }}  onClick={async()=>{
              try {
                let data={
                  task:'done',
                  taskid:ele.id,
                  
                }
                let res=await axios.put('http://localhost:5400/api/v1/taskroutes/todo',data, { withCredentials: true }).then((res)=>{
                  if(res){
                    console.log(res);
                  }
                  seteffect(!effect)
                })
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {"Done"}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Taskdata;
