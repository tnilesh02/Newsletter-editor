import React, { Component } from 'react';
import { createStore } from 'polotno/model/store';
import Topbar from './topbar';
import './aboutstyle.css';
import mongoImage from '../../source/mongodb-seeklogo.com.svg';
import expressImage from '../../source/express-js-seeklogo.com.svg';
import reactImage from '../../source/react-seeklogo.com.svg';
import nodeImage from '../../source/node-node-js-seeklogo.com.svg';
const store = createStore({
    key: 'cV3T3OzWmMMMXCqWZfb3',
    showCredit: true
  });

export class About extends Component {

  state = {
    showModal: false,
    modalContent: "",
    count: 0
  }

  onSubmit() {
    this.setState({
      showModal: true,
      modalContent: "successfully submitted the form"
    })
  }

  handleClose() {
    this.setState({
      showModal: false,
      modalContent: ""
    })
  }

  render() {
    let showModal = this.state.showModal ? "modal display-block" : "modal display-none";
    let modalContent = this.state.modalContent;

    return (
      <div 
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="about-page-body"
      >
        <div className={showModal}>
          <div className="modal-content modal-main">
            {modalContent}
            <button className="modal-content close-button" type="button" onClick={() => {this.handleClose()}}>
              CLOSE
            </button>
          </div>
        </div>
        
        <Topbar store={store} />

        <div className="about-box">
          <div className="about-content">
            <div className="title">About the site</div>
            <hr className="line-break"/>
            <div className="description">
              This website uses React on frontend and Express and Node js on backened.<br/> I used MongoDB for the database.
              <div className="language-images-box">
                <img className="language-image" src={mongoImage} alt="MongoDB"/>
                <img className="language-image" src={expressImage} alt="Express"/>
                <img className="language-image" src={reactImage} alt="React"/>
                <img className="language-image" src={nodeImage} alt="Nodejs"/>
              </div>

              <h4>Singup/Login Page</h4>
              <hr className="line-break"/>
              The logic for singup/login page is simple
              <br/>
              Whenever you register
              <div className="list">
              - It will check whether the user is already in the database or not<br/>
              - If yes, then it will show a modal stating the same.<br/>
              - It no, then it will add the user in database.<br/>
              </div>

              <h4>The Newsletter editor page</h4>
              <hr className="line-break"/>
              Polotno has a standard editor template. I had to just put it in the code.<br/>
              but retrieving the design is a bit different. To be able to retrieve the design, you need to
              <div className="list">
              - Click on 'save' button for the design that you want to be able to retrieve.<br/>
              - It will download a json file on your PC<br/>
              - Then open the file whenever you want to use it again in the editor<br/>
              </div>
            </div>
          </div> 
        </div>

        <div className="about-box">
          <div className="title">Contact Us!</div>
          <hr className="line-break"/>
          <div className="form-group">
            <div className="form-input">
              <div>Name:</div>
              <input className="form-input-box" type="text" placeholder="Name" />
            </div>
            <div className="form-input">
              <div>EmailId:</div>
              <input className="form-input-box" type="text" placeholder="Email Id" />
            </div>
            <div className="form-input">
              <div>Subject:</div>
              <input className="form-input-box" type="text" placeholder="Subject" />
            </div>
            <div className="form-input">
              <div>Message:</div>
              <textarea className="message-box" placeholder="Message"></textarea>
            </div>
            <button className="form-submit-button" onClick={() => this.onSubmit()}>Submit</button>
          </div>
        </div> 
      </div>
      )
  }
}