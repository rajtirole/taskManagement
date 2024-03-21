import React from "react";
import { useNavigate, Route,Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectTo, authh,setauthh}) {
    const navigate=useNavigate()
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", typeof isAuthenticated);
  console.log(redirectTo);
  console.log(children);
  console.log(document.cookie.token);
console.log(authh);
  return isAuthenticated=='true' ? children : <Navigate to={redirectTo} />;
//   return isAuthenticated=='true' ? children : navigate(redirectTo);
//   return isAuthenticated ? <div>true</div>: <div>false</div>;
//   return authh ? <div>true</div>: <div>false</div>;
}

export default ProtectedRoute;
