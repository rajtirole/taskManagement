import React from 'react'
// import dot from './image/dot.png'
import './Divstyle.css'
// import Down from './image/Down.png'

export default function DivTodo() {
  return (
    <div className='herodiv'>
        <div  className='section1'>
          <p> Low priority</p>
        <div> dot </div> 
        </div>
        <h1  className='head'> Hero section</h1>
        <div className ='section2'>
            <h3> Checklist(/)</h3>
            <div> img</div>
        </div>
        <div className ='section3'>

            <button className='btn-btn'> 10 fab</button > 
            <div className='section4'>
            <button className='btn-btn'> BACKLOG</button > 
            <button className='btn-btn'>PROGRSS </button > 
            <button className='btn-btn'> DONE</button > 
            </div>
            
            
      </ div>
      
    </div>
  )
}
