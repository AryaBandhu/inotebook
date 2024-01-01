import Navbar from './components/Navbar';
import './App.css';
import HomePage from './components/HomePage';
import About from './components/About';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
