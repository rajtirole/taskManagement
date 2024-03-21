import React, { useEffect, useState,createContext,useLayoutEffect } from "react";
import  "./BoardStyle.css";
import Backlog from "./Backlog";
import Todo from "./Todo";
import Progres from "./Progres";
import Done from "./Done";
import Dashboard from "./Dashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Board() {
  let [user, setuser] = useState();
  const [todo,settodo]=useState(true)
  const [data,setdata]=useState(0)
  const [dataa,setdataa]=useState()
  const [response,setresponse]=useState()
  
const [effect,seteffect]=useState(true)
console.log(seteffect);
  const [todoarr,settodoarr]=useState()
  const [donearr,setdonearr]=useState()
  const [progressarr,setprogressarr]=useState()
  const [backlogarr,setbacklogarr]=useState()
  // const UserContext = createContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  var d = new Date();
  console.log(d);
  const newdate = new Date(d)
  const day = newdate.getDate() 
  const month = newdate.getMonth()     // 10 (Month is 0-based, so 10 means 11th Month)
const year = newdate.getFullYear()   
console.log(newdate);
console.log(day);
console.log(month);
console.log(year);


  
  useEffect(()=>{
    dataa();
   async function dataa(){
    try {
      let res =await  axios.get('http://localhost:5400/api/v1/user/getdata',{withCredentials:'true'}).then((res)=>{
    console.log(res);
    if(res){
      setdata(res.data.user)
      console.log(data);
    }
    })
    // console.log(res); 
  } catch (error) {
      console.log(error); 
      
    }
   }
  },[])
  // useEffect(()=>{
  //  dataaa();
  //     async function dataaa(){
  //       try {
  //         let res =  await axios.get('http://localhost:5400/api/v1/taskroutes/getuserdata',{withCredentials:'true'}).then((res)=>{
  //         //  console.log(res.data.data);
        
  //         if(res){
  //           return setdataa(res.data.data)

  //           console.log(dataa);
  //         }
  //         // console.log(dataa);
        
  //       })
  //       // console.log(dataa);
  //       } catch (error) {
  //         console.log(error);
        
  //     }
  //     }
  // },[])
  // useEffect(()=>{
  //   // console.log(dataa)
  //   if (dataa) {
  //      console.log(dataa)
  //   }
  // },[dataa])
  useEffect(()=>{
    // console.log(dataa)
    if (data) {
       console.log(data)
    }
  },[data])
  

  useEffect(() => {
    console.log('effealckjdlkfjafljdslfjasl');
    setLoading(true);
    axios.get('http://localhost:5400/api/v1/taskroutes/getuserdata',{withCredentials:true})
        .then(res => {
          console.log(res.data.success);
          if(res.data.success){
          setdataa(res.data.data.todo.todotask);
          console.log(dataa);
          setresponse(res.data.data.todo.todotask)

          }
          // console.log(res); 
            
            
              // settodoarr(()=>{
              //   return response.filter((ele,index)=>{
              //     if(ele.task){
              //       if(ele.task=='todo'){
              //         return ele
              //       }
                
              //     }
              //   })
              // })
              // console.log(todoarr);
              // setprogressarr(()=>{
              //   response.filter((ele,index)=>{
              //     if(ele.task){
              //       if(ele.task=='progress'){
              //         return ele
              //       }
                
              //     }
              //   })
              // })
              // setbacklogarr(()=>{
              //   response.filter((ele,index)=>{
              //     if(ele.task){
              //       if(ele.task=='backlog'){
              //         return ele
              //       }
                
              //     }
              //   })
              // })
              // setdonearr(()=>{
              //   response.filter((ele,index)=>{
              //     if(ele.task){
              //       if(ele.task=='done'){
              //         return ele
              //       }
                
              //     }
              //   })
              // })
            
        })
        .catch(err => {
            console.log(err.message);
            setError(true);
        })
        .finally(()=> {
            setLoading(false);
        })
}, [Backlog,Dashboard,effect])



console.log(dataa);
console.log(response);

// console.log(todoarr);
// console.log(dataa);
if(error) return (<div>error</div>)
// if(loading) return (<div>loading</div>)
 return (
    <>


    <div
        style={{
          height: "100vh",
          width:'100vw',
          display:'flex',
          justifyContent:'space-between',
          alignItems:"center"
          
        }}
      >
        <Dashboard ></Dashboard>

        <div className="Board">
          <div className="containerr">
         <div className="containerrr">
          <h2>Welcome! {data.fullName}</h2>
          <div className="date">Date:{`${day}/${month<9?`0${month}`:month}/${year}`} </div>
         </div>
         <div className="containerrr">
         <h1 >Board</h1>
          <div >
            <select className="datee">
              <option >This week</option>
            </select>
          </div>
         </div>
          </div>
          <div className="herosection">
            {/* {dataa?<Backlog heading={'Backlog'} backlog={true} getdata ={data} getdataa={backlogarr} />:console.log(dataa)}
            {dataa?<Backlog heading={'To do'} todo={true} getdata ={data} getdataa={todoarr} />:console.log(dataa)}
            {dataa?<Backlog heading={'In progress'} progress={true} getdata ={data} getdataa={progressarr} />:console.log(dataa)}
            {dataa?<Backlog heading={'done'} done={true} getdata ={data} getdataa={donearr} />:console.log(dataa)} */}



            {/* {dataa?<Backlog heading={'Backlog'} backlog={true} getdata ={data} getdataa={dataa.data.data.backlog.backlogtask} />:console.log(dataa)} */}
            {<Backlog heading={'Backlog'} backlog={true} getdata ={data} getdataa={dataa} effect={effect} seteffect={seteffect} loading={loading}/>}
            {<Backlog heading={'To do'} todo={true} getdata ={data} getdataa={dataa} effect={effect} seteffect={seteffect} loading={loading}/>}
            {<Backlog heading={'In progress'} progress={true} getdata ={data} getdataa={dataa} effect={effect} seteffect={seteffect} loading={loading}/>}
            {<Backlog heading={'done'} done={true} getdata ={data} getdataa={dataa} effect={effect} seteffect={seteffect} loading={loading}/>}
            {/* {dataa?<Backlog heading={'In progress'} progress={true} getdata ={data} getdataa={dataa.data.data.inprogress.inprogresstask} />:console.log(dataa)} */}
           
            {/* {dataa?<Backlog heading={'done'} done={true} getdata ={data} getdataa={dataa.data.data.done.donetask} />:console.log(dataa)} */}
            {/* {dataa?<Backlog heading={'To do'} backlog={true} getdata ={data} getdataa={dataa.data.data.inprogress.inprogresstask} />:console.log(dataa)} */}
            {/* <Backlog heading={'To do'} todo={true} getdata ={data} getdataa={dataa.data.data.todo.todotask}/> */}
            {/* <Backlog heading={'In progress'} progress={true} getdata ={data} getdataa={dataa.data.data}/>
            <Backlog  heading={'done'}  done ={true} getdata ={data} getdataa={dataa}/> */}
            
            {/* <Todo />
            <Progres />
            <Done /> */}
          </div>
        </div>
      </div>


    
    </>
  );
}
