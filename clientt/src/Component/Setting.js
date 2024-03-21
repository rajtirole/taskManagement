import React from 'react'
import Data from './Settingstyle/Setting'
import data1 from './Settingstyle/Settingstyle.css'
import Dashboard from './Dashboard'
export default function Setting() {
  return (
   <>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
   <Dashboard></Dashboard>
  <Data></Data>
   </div>
   </>
  )
}
