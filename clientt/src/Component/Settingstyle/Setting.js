import React from "react";
import "./Settingstyle.css";
import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Setting() {
  const navigate =useNavigate()
  const [formValue, setformvalue] = useState({
    name: "",
      sword: "",
    newpassword: "",
  });
  return (
    <div className="setting">
      <h1> Setting </h1>
      <div>
        {" "}
        <input
          type="text"
          placeholder="Name"
          className="input"
          onChange={(e) => {
            setformvalue((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
          value={formValue.name}
        />{" "}
      </div>
      <div>
        {" "}
        <input
          type="password"
          placeholder="Old password"
          className="input"
          onChange={(e) => {
            setformvalue((prev) => {
              return { ...prev, oldpassword: e.target.value };
            });
          }}
          value={formValue.oldpassword}
        />{" "}
      </div>
      <div>
        {" "}
        <input
          type="password"
          placeholder=" New Password"
          className="input"
          onChange={(e) => {
            setformvalue((prev) => {
              return { ...prev, newpassword: e.target.value };
            });
          }}
          value={formValue.newpassword}
        />{" "}
      </div>
      <button className="btn" onClick={async function (){
        try {
          let dataa ={fullName: formValue.name, oldpassword:formValue.oldpassword,newpassword:formValue.newpassword}
          // const res = await axios.post('http://localhost:5400/api/v1/user/changePassword',dataa)
//           let res =await axios('http://localhost:5400/api/v1/user/changePassword', {
//   method: 'GET',
//   withCredentials: true
// },dataa)
let res=await axios.post('http://localhost:5400/api/v1/user/changePassword',dataa, { withCredentials: true }).then((res)=>{
  console.log(res);
  window.alert(res)
  navigate('/board')
}).catch(err=>{
  console.log(err);
})
// axios.post('http://localhost:5400/api/v1/user/changePassword',dataa)

        
        
        } catch (error) {
          console.log('faksflksj');

          window.alert(error)
          console.log(error);
          
        }


      }}>
        {" "}
        Update
      </button>
    </div>
  );
}
