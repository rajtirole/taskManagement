import React,{useState} from 'react'
import './Modalstyle.css'
import Highimage from './image/Frame 6.png'
import Midimage from './image/Frame 5.png'
import Lowimage from './image/Frame 7.png'
import Addimage from './image/add.png'
import  Deleteimage from './image/Delete.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import DatePicker from 'react-date-picker';

export default function Modal({oncancel,effect,seteffect}) {
  const navigate=useNavigate();
  
    let [priority,setpriority]=useState('')
    let [tasktittle,settasktittle]=useState('')
    let [date,setdate]=useState('2023-02-01')

  
  const [inputs, setInputs] = useState([]);
  const [Count ,setCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);




  async function submitHandler(){
    console.log(inputs,'count',Count,'ischeck',isChecked,tasktittle,priority,date);
   let data= {
      taskTittle:tasktittle,
      priority:priority,
      date:date,
      checklist:inputs
    }
    try {
      let res=await axios.post('http://localhost:5400/api/v1/taskroutes/todo',data, { withCredentials: true }).then((res)=>{
  console.log(res);
  window.alert(res)
  oncancel();
  navigate('/board')
}).catch(err=>{
  console.log(err);
})
      
    } catch (error) {
      console.log(error);
      
    }
    seteffect(!effect)

    
  }

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
    console.log(inputs);
    setCount(Count + 1);
    
  };
  const handleDeleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    setCount(Count-1);
  };
  const handleCheckboxChange = () => {
   
    setIsChecked(!isChecked)
   
  };
  
  
  return (
    <div className='modal'>
         <div  className='container'>
    <div style={{margin:'0',padding:'0'}}>
    <p className='title'> Title*</p>
      
      </div>         
            <input  type='text' placeholder='Enter Task Title'  className ='inputfiald' onChange={(e)=>{settasktittle(e.target.value)}}/>
         
         <div className='priority'>
            <h4> Select priority *</h4>
           
      <div onClick={() => { setpriority('HIGH')}}  className ='imgdiv'>< img src={Highimage}  /> </div>
      <div onClick={() => setpriority('MODRATE')}  className ='imgdiv' > < img src={Midimage}  />  </div>
      <div onClick={() => setpriority('LOW')}  className ='imgdiv'> < img src={Lowimage }  />  </div>
    </div>
      <div className='checklist'>
         <h3> Checklist( /{Count} )</h3>
         <div className='div2'>
        {inputs.map((inputValue, index) => (
            
                
          <div key={index} className='div1'>
             <input
          type="checkbox"
          
          
        />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="input"
              placeholder='Add Task Here'
            />
             <button className="delete-btn" onClick={() => handleDeleteInput(index)}>
             <img src={Deleteimage}/>
            </button>
           
          </div>
        
        ))}
        
          </div>
          </div> 
           <div onClick={handleAddInput}  className='addbtn'> < img src={Addimage }/>  </div>

           <div className='footerbtn'>    
           {/* <button  className='select' >Select Due Date</button> */}
           
           <input type='date' className='select' value={'2023-02-02'} onChange={(e)=>{
setdate(e.target.value)
           }} ></input>
           
           <button className='cancel'  onClick={()=>{oncancel()}}> Cancel</button>
           <button className='save' onClick={submitHandler} > Save</button>

           </div>
           </div>
    
    </div>
  )
}
