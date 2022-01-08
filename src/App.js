import './style/App.css';
import VideoPlayer from './components/VideoPlayer.js';
import { DndProvider } from "react-dnd"; //need to wrap highest order component
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from './components/DragDrop';
import Timeline from './components/Timeline';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <body>
          <header>
            <h1>Multimedia AVT</h1>
          </header>
          <VideoPlayer />
          <DragDrop />
          <Timeline />
          <footer className='footer'>
            <ul>
              <p>Ekaterina Krysenkova</p>
              <p className='footer-matrikel'>0573734</p>
            </ul>
            <ul>
              <p>Paula Pätzold</p>
              <p className='footer-matrikel'>0573372</p>
            </ul>
            <ul>
              <p>Philip Blankenburg</p>
              <p className='footer-matrikel'>0571740</p>
            </ul>
            <ul>
              <p>Ronny Brzeski</p>
              <p className='footer-matrikel'>0569420</p>
            </ul>
          </footer>
        </body>
      </div>

    </DndProvider >
  )
}
export default App;
