import React, { useState } from 'react';
import './App.css';
import Signup from './Component/Signup';
import { BrowserRouter, Routes, Route, useSearchParams, } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Board from './Component/Board'
import Analytics from './Component/Analytics'
import Setting from './Component/Setting'
import Login from './Component/Login';
import ProtectedRoute from './Component/ProtectedRoute';

function App() {
  const [authh,setauthh]=useState(false)
  return (
    <div className="App">
     <BrowserRouter>
     {/* <Dashboard/> */}
       <Routes>
        {/* <ProtectedRoute  path='/board' component={<Board/>}/> */}
        <Route  path='/board'  element ={
        <ProtectedRoute redirectTo="/login" authh={authh} setauthh={setauthh}>
          <Board/>
          </ProtectedRoute>}/>
        <Route  path='/analytics'  element ={<ProtectedRoute redirectTo="/login" authh={authh} setauthh={setauthh}><Analytics/></ProtectedRoute>}/>
        <Route  path='/setting'  element ={<ProtectedRoute redirectTo="/login" authh={authh} setauthh={setauthh}><Setting/></ProtectedRoute>}/>
        {/* <Route  path='/analytics'  element ={<Analytics/>}/> */}
        {/* <Route  path='/setting'  element ={<Setting/>}/> */}
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login authh={authh} setauthh={setauthh}/>}/>
       <Route path='/' element={<Login authh={authh} setauthh={setauthh}/>}/>
       <Route path='*' element={<h2>page route not available</h2>}/>
       </Routes>
       {/* <Routes>
       </Routes> */}

           </BrowserRouter>
      </div>
  );
}

export default App;
