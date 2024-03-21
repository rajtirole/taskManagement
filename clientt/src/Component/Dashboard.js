
import React from 'react';
import { Link } from 'react-router-dom';
import ArtImage from './image/Group 3.png'
import AnalyticsImage from './image/Group 4.png'
import SettingImage from './image/Group 5.png'
import logout from './image/logoutt.png'
import Image from './image/Group 1.png'
import './Dashboardstyle.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


export default function Dashboard() {
  const navigate=useNavigate();
  return (
    <>
    <div  className='dashboard'>
     <div  className='image'> < img src={Image}/> </div>
     <ul>
       <li  ><Link  to ='/board'>< img src={ArtImage}   className='hero'/></Link></li>
       <li><Link  to ='/analytics'>< img  src={ AnalyticsImage}/></Link></li>
       <li> <Link  to ='/setting'>< img  src={ SettingImage}/></Link></li>
     </ul>
     <div onClick={async function(){
         try {
          const res = await axios.get('http://localhost:5400/api/v1/user/logout',{withCredentials:'true'})
          console.log(res);
  
          if(res.data.success==true){
              window.alert(res.data.message)
              localStorage.setItem("isAuthenticated", false);
              
              console.log(localStorage.getItem("isAuthenticated"));
              navigate('/login')
          }
        } catch (error) {
          window.alert(error.response.data.message)
          
        }
       }}> < img  src={logout}/></div>
    </div>
      

    
    </>
  );
}
 
