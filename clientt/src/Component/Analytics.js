import React, { useEffect, useState } from 'react'
import Analyticss from './Analyticsstyle/Analytics'
import Analytics1 from './Analyticsstyle/Analyticsstyle.css'
import Dashboard from './Dashboard'
import axios from 'axios'

export default function Analytics() {
 

  return (
    <>

<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
   <Dashboard></Dashboard>
   <Analyticss></Analyticss>
   </div>
      
    
    </>
  )
}
