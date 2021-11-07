
//import './App.css';
import Videoplayer from './Videoplayer';
import { DndProvider } from "react-dnd"; //need to wrap highest order component
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from './components/DragDrop';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>

      <div className="App">
        <Videoplayer />
        <DragDrop />
      </div>

    </DndProvider>
  );
}

export default App;
