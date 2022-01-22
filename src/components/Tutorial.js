import React, { Component } from "react";
import "../style/Modal.css";


class Tutorial extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>
            <h2>Tutorial</h2>
            <p>
              <p>
                Click the "UPLOAD"-Button to upload a video.<br />
                If you want to upload a different video, click the "UPLOAD NEW VIDEO"-Button.
              </p>
              <p>
                Choose a video-filter from the gallery on the left and simply click-and-drag it
                into the filter-timeline. <br />
                There you can adjust its size and position. Feel free to add as many filters as you like.<br />
                You can see the effects of your added filters by clicking the Play-Button in the video player.<br />
                If you're happy with the result, click the "DOWNLOAD"-Button to download your new masterpiece.
              </p>
              <p>
                If something doesn't sound right, try applying some audio filter by checking the boxes.
              </p>
            </p>
          </p>
        </Modal>
        <button className="tutorialbtn" type="button" onClick={this.showModal}>
          ?
        </button>
      </main>
    )
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button className="tutorialclsbtn"
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};


export default Tutorial