import React, { useRef } from "react";
import Backlogstyle from "./Backlogstyle.css";
import CollapImage from "./image/collap.png";
import { useState } from "react";
import plusImage from "./image/Group 10.png";
import Taskdata from "./taskdata";
import Modal from "./Modal";
export default function Backlog({
  heading = "Backlog",
  todo = false,
  backlog = false,
  progress = false,
  done = false,
  getdata = "",
  getdataa = "",
  seteffect,effect,loading
}) {
  const [data, setdata] = useState([]);
  const [dataaaaa, setdataaaaa] = useState([]);
  let [checklistttt, setchecklistttt] = useState(false);
  const [modalopen, setmodalopen] = useState(false);

//   console.log(seteffect);
// console.log(getdataa);
// // setdataaaaa(getdataa)
// console.log(getdata);
  return (
    <div className="backlog">
      <div className="heading2">
        <h2>{heading}</h2>
        <div
          style={{
            width: "40%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {" "}
          {todo && (
            <img
              src={plusImage}
              onClick={() => {
                setmodalopen(true);
                
              }}
            />
          )}
          {modalopen && (
            <Modal seteffect={seteffect} effect={effect}
              oncancel={() => {
                setmodalopen(false);
              }}
            />
          )}
          <img
            src={CollapImage}
            onClick={() => {
              //  setchecklistttt(!checklistttt)
            }}
          />
        </div>
      </div>
      {
     <div className="backlogdata">
      {getdataa&&getdataa.map((ele,index) => {
      // {console.log('loadingfalskdjflkjsd',!loading)}

          // console.log(ele);
          if(backlog){
            if(ele.task=='backlog'){
              return (
                <>
                   { !loading&&<Taskdata
                    checklistttt={checklistttt}
                    getdata={getdata}
                    getdataa={getdataa}
                    todo={todo}
                    backlog={backlog}
                    progress={progress}
                    done={done}
                    el={ele} 
                    effect={effect}
                    seteffect={seteffect}
                    loading={loading}
                    modalopen={modalopen}
                    ></Taskdata>}
                </>
              );
            }
          }
          if(todo){
            if(ele.task=='todo'){
              return (
                <>
                 { !loading&&<Taskdata
                   checklistttt={checklistttt}
                   getdata={getdata}
                   getdataa={getdataa}
                   todo={todo}
                   backlog={backlog}
                   progress={progress}
                   done={done}
                   el={ele} 
                   effect={effect}
                   seteffect={seteffect}
                   loading={loading}
                   modalopen={modalopen}
                  ></Taskdata>}
                </>
              );
            }
          }
          if(progress){
            if(ele.task=='progress'){
              return (
                <>
                 { !loading&&<Taskdata
                    checklistttt={checklistttt}
                    getdata={getdata}
                    getdataa={getdataa}
                    todo={todo}
                    backlog={backlog}
                    progress={progress}
                    done={done}
                    el={ele} 
                    effect={effect}
                    seteffect={seteffect}
                    loading={loading}
                    modalopen={modalopen}
                  ></Taskdata>}
                </>
              );
            }
          }
          if(done){
            if(ele.task=='done'){
              return (
                <>
                 {!loading&& <Taskdata
                    checklistttt={checklistttt}
                    getdata={getdata}
                    getdataa={getdataa}
                    todo={todo}
                    backlog={backlog}
                    progress={progress}
                    done={done}
                    el={ele} 
                    effect={effect}
                    seteffect={seteffect}
                    loading={loading}
                    modalopen={modalopen}
                  ></Taskdata>}
                </>
              );
            }
          }
         
        })}
      </div>}
    </div>
  );
}
