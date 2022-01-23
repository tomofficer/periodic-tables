import React from 'react';
import Menu from './Menu';
import Routes from './Routes';
import './Layout.css';

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
const Layout = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 layout__side-nav-color'>
          <Menu />
        </div>
        <div className='col main'>
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default Layout;