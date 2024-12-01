import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Layouts/Navbar';
import NoteState from './Context/NoteState';

function App() {
  return (
    <>
      <NoteState>        
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
