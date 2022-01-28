import React, { Component } from "react";
import "../style/Modal.css";

/**
* Modal as User Interface pattern for Tutorial Pop-up
* provides information and requires confirmation 
* component to manage state of modal
* button to access modal
* State includes property (show), if show: false, the modal is hidden
*/
class Tutorial extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  /** 
  *Updates show-property to true, when user opens modal
  */
  showModal = () => {
    this.setState({ show: true });
  };

  /**
  * Updates show-property to false, when user closes the modal
  */
  hideModal = () => {
    this.setState({ show: false });
  };

  /**
  * Lifecycle method
  * handles the display of the modal
  * Button accepts onClick-attribute to apply .showModal()
  * attributes show, handleClose are props from modal component
  * -> manage logic of state and hideModal()
  */
  render() {
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>
            <h2>Tutorial</h2>
            <p>
              <p>
                To get you started, we've included a video for you to try out our cool filters.
              </p>
              <p>
                Choose a video-filter from the gallery on the left and simply click-and-drag it
                into the filter-timeline. <br />
                There you can adjust its size and position. Feel free to add as many filters as you like.<br />
                Once you click "APPLY FILTER", you can see the effects of your added filters by clicking the play button in the video player.<br />
                If you're happy with the result, click the "DOWNLOAD"-Button to download your new masterpiece. <br />
                Changed your mind? No problem! Simply double-click the filter in the timeline you don't like and we'll pretend, it never happened.
              </p>
              <p>
                Ready to try it on your own video material? <br />
                Click the "UPLOAD"-Button to upload a video.<br />
                If you want to upload a different video, click the "UPLOAD NEW VIDEO"-Button. <br />
                And simply repeat the filter-adding process to turn your video into your super cool video.
              </p>
              <p>
                If something doesn't sound right, try applying some audio filters by checking the boxes.
              </p>
              <p>
                You can always come back to this tutorial by clicking the "?" at the top of the page.
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

/**
* Stateless functional modal component 
* Arguments: handleClose, show, children
* show represents property on state
*/
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';


  /** 
   * Passes argument children (represented as props.children) 
   * -> reference to opening/closing functionality
   * Button to close modal 
   * -> onClick attribute, accepts hideModal(), represented as argument handleClose
   * showHideClassName assigns value conditional check if value of show-property is true
   * properties display-block/display-none are handled through Modal.css
  */
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button className="tutorialclsbtn"
          onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};


export default Tutorial
