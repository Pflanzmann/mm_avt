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
            <h2>HOW TO PLAY</h2>
            <p>fdjkghafhajfgjkfvb</p>
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
        <button className= "tutorialclsbtn"
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};


export default Tutorial