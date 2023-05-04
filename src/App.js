import React from 'react';
import './App.css';
import LoginForm from "./components/loginform";
import Nav from './Nav';
import Appointment from './Appointment';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/appointment" element={<Appointment/>} />
        </Routes>
    </div>
    </Router>
  );
}


const Home =() => (
<div className="page"> 
  <LoginForm />
</div>
);


export default App;
