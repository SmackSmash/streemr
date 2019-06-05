import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = props => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        STREEMR
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/streams/show" className="item">
          Show
        </Link>
        <Link to="/streams/edit" className="item">
          Edit
        </Link>
        <Link to="/streams/new" className="item">
          New
        </Link>
        <Link to="/streams/delete" className="item">
          Delete
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
