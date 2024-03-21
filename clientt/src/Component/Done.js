import React from 'react'
import DoneStyle from './DoneStyle.css'
import Collap from './image/collap.png'

export default function Done() {
  return (
    <div className='done'>
      <h5 className='heading3'>Done</h5>
      <div className='collap3'><img  src={Collap}/></div>
    </div>
  )
}
