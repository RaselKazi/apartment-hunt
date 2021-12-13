import React, { useContext } from 'react';
import Sidebar from '../../Components/Dashboard/Sidebar/Sidebar';
import '../../Components/Dashboard/Sidebar/Sidebar.scss';
import logo from '../../assets/logos/logo.png';
import { Link } from 'react-router-dom';
import { loggedInInfo } from '../../Components/Login/loginManager';
//========================================================================

const MainDashboard = (props) => {
  document.title = 'AH || Dashboard';
  // Context from App.js
  const loggedUSer = loggedInInfo();

  return (
    <section className='container-fluid'>
      <div className='row bg-white py-3'>
        <div className='col-md-2'>
          <Link to='/'>
            <img
              className='text-center ml-4'
              style={{ height: '50px' }}
              src={logo}
              alt=''
            />
          </Link>
        </div>
        <div className='col-md-10 d-flex align-items-center justify-content-between mt-3'>
          <h5>{props.title}</h5>
          <h5>{loggedUSer.name}</h5>
        </div>
      </div>
      <div className='row bg-white'>
        <div className='col-md-2 sidebar-pages'>
          <Sidebar />
        </div>
        <div className='col-md-10' style={{ backgroundColor: '#F4F7FC' }}>
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default MainDashboard;
