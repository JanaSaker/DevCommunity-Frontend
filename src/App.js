import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx'; // Adjust the import path as necessary
import Home from './pages/home/home.jsx'; // Adjust the import path as necessary
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import JobBoard from './pages/jobboard/jobboard.jsx';
import OwnerJobs from './pages/jobboard/userjobs.jsx';
import CVBoard from './pages/cv/cv.jsx';
import DevTube from './pages/DevTube/DevTube.jsx';
import PomoClock from './pages/pomoclock/pomoclock.jsx';
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/jobs' element={<JobBoard/>}/>
        <Route path='/ownerjobs' element={<OwnerJobs/>}/>
        <Route path='/cvbank' element={<CVBoard/>}/>
        <Route path='/devtube' element={<DevTube/>}/>
        <Route path='/pomoclock' element={<PomoClock/>}/>

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
