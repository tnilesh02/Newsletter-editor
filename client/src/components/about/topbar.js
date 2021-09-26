import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Navbar,
  Alignment
} from '@blueprintjs/core';
import DownloadButton from 'polotno/toolbar/download-button';
import { downloadFile } from 'polotno/utils/download';
import styled from 'polotno/utils/styled';
import history from '../../history.js'
import './topbarstyle.css'

export default observer(({ store }) => {
  const inputRef = React.useRef();

  return (
    <div className="navbar">
      <div>
        <Navbar.Group align={Alignment.LEFT}>
        <h1 style={{marginLeft: '20px'}}>NTsocial</h1>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} >
          <button className="navbar-buttons" onClick={() => {history.push('/'); window.location.reload(true);}}> 
            Log Out
          </button>
          <button className="navbar-buttons" onClick={() => {history.push('/newsletter-editor'); window.location.reload(true);}}>
            Newsletter Editor
          </button>
          <button className="navbar-buttons" onClick={() => {history.push('/about'); window.location.reload(true);}}> 
            About
          </button>
        </Navbar.Group>
      </div>
    </div>
  );
});