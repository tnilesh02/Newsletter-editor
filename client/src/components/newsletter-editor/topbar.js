import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Navbar,
  Alignment,
  Colors
} from '@blueprintjs/core';
import DownloadButton from 'polotno/toolbar/download-button';
import { downloadFile } from 'polotno/utils/download';
import styled from 'polotno/utils/styled';
import history from '../../history.js'
import './topbarstyle.css'

export default observer(({ store }) => {
  const inputRef = React.useRef();
  const element = store.selectedElements[0];

  return (
    <div className="navbar">
      <div>
        <Navbar.Group align={Alignment.LEFT}>
        <h1 style={{marginLeft: '20px'}}>NTsocial</h1>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} >
          <button
            icon="new-object"
            className="navbar-buttons"
            onClick={() => {
              const ids = store.pages
                .map((page) => page.children.map((child) => child.id))
                .flat();
              const hasObjects = ids?.length;
              if (hasObjects) {
                if (!window.confirm('Remove all content for a new design?')) {
                  return;
                }
              }
              const pagesIds = store.pages.map((p) => p.id);
              store.deletePages(pagesIds);
              store.addPage();
            }}
          >
            New
          </button>
          <label htmlFor="load-project">
            <button
              icon="folder-open"
              className="navbar-buttons"
              onClick={() => {
                document.querySelector('#load-project').click();
              }}
            >
              Open
            </button>
            <input
              type="file"
              id="load-project"
              accept=".json,.polotno"
              ref={inputRef}
              style={{ width: '180px', display: 'none' }}
              onChange={(e) => {
                var input = e.target;

                if (!input.files.length) {
                  return;
                }

                var reader = new FileReader();
                reader.onloadend = function () {
                  var text = reader.result;
                  let json;
                  try {
                    json = JSON.parse(text);
                  } catch (e) {
                    alert('Can not load the project.');
                  }

                  if (json) {
                    store.loadJSON(json);
                  }
                };
                reader.onerror = function () {
                  alert('Can not load the project.');
                };
                reader.readAsText(input.files[0]);
              }}
            />
          </label>
          <button
            icon="floppy-disk"
            className="navbar-buttons"
            onClick={() => {
              const json = store.toJSON();

              const url ='data:text/json;base64,' + window.btoa(unescape(encodeURIComponent(JSON.stringify(json)))); 
              downloadFile(url, 'polotno.json');
            }}
          >
            Save
          </button>
          <div class="dropdown">
            <button className="dropbtn">Download</button>
            <div className="dropdown-content">
              <button  onClick={() => {
                if(store.activePage){
                store.saveAsImage({ fileName: 'polotno.png' });
              }
              }}>Save as image</button>
              <button onClick={() => {store.saveAsPDF({ fileName: 'polotno.pdf' });}}>Save as PDF</button>
            </div>
          </div>
          <button className="navbar-buttons" onClick={() => {history.push('/'); window.location.reload(true);}}> 
            Log Out
          </button>
          <button className="navbar-buttons" onClick={() => {history.push('/about'); window.location.reload(true);}}> 
            About
          </button>
        </Navbar.Group>
      </div>
    </div>
  );
});