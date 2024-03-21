import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ArtImage from "./image/Art.png";
import  "./SignupPage.css";
import  "./login.css";
import passwordd from '../Component/image/Group (1).png'
import paswword_icon from '../Component/image/lock.png'
import mail from '../Component/image/icon.png'
function Login({authh,setauthh}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
  async function handleSubmit(event){
    event.preventDefault();

    // // Simulate login API call
    // if (email === 'user@example.com' && password === 'password') {
    //   alert('Login successful!');
    //   // Redirect to home page or other protected route
    // } else {
    //   alert('Invalid email or password');
    // }

    try {
        let dataa ={email:email, password:password}
        const res = await axios.post('http://localhost:5400/api/v1/user/login',dataa, { withCredentials: true })
        console.log(res);

        if(res.data.success==true){
            window.alert(res.data.message)
            localStorage.setItem("isAuthenticated", true);
            setauthh(true)
            console.log(authh);
            console.log(localStorage.getItem("isAuthenticated"));
            // window.location.pathname = "/";
            navigate('/board')
          
        }
      } catch (error) {
        window.alert(error)
        
      }
  

  };

  return (
    <>  
    

    <div className="signup">
      <div className="right">
        <img src={ArtImage} className="img" />
        <p className="para"> Welcome aboard my friend</p>
        <p className="para1"> just a couple of clicks and we start</p>
      </div>
      <div className="left">
      <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <img src={mail}></img>
        <input
          type="email"
          id="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /></div>
       <div>
       <img src={paswword_icon}></img>
        <input
          type={showPassword?'text':'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />
         <img src={passwordd} onClick={()=>{
          setShowPassword(!showPassword)
         }}></img>  
        </div>
        <button type="submit" className='btn'>Log in</button>
        <p>
        Have no account yet?
      </p>
        <button type="button" className='register' onClick={(e)=>{
            navigate('/signup')
        }}>Register</button>
      </form>
     
    </div>
      </div>
    </div>









    {/* <div className="signup">
      <div className="right">
        <img src={ArtImage} className="img" />
        <p className="para"> Welcome aboard my friend</p>
        <p className="para1"> just a couple of clicks and we start</p>
      </div>
      </div> */}
    
    
    
    
    
     
    </>

  );
}

export default Login;
