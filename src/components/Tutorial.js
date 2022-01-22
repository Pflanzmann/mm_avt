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
          <p>Hier steht Tutorial stuff
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
            sed diam nonumy eirmod tempor invidunt ut labore et dolore
             magna aliquyam erat, sed diam voluptua. At vero eos et 
             accusam et justo duo dolores et ea rebum. Stet clita kasd 
             gubergren, no sea takimata sanctus est Lorem ipsum dolor 
             sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing 
             elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
             dolore magna aliquyam erat, sed diam voluptua. At vero eos 
             et accusam et justo duo dolores et ea rebum. Stet clita 
             kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
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