import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChoresProvider } from "./components/context/choresContext";
import Day from "./components/Pages/Day";
import Week from "./components/Pages/Week";
import Randomize from "./components/Pages/Randomize";
import "./App.css";

function App() {
  return (
    <ChoresProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Day />} />
          <Route path="/day" element={<Day />} />
          <Route path="/week" element={<Week />} />
          <Route path="/randomize" element={<Randomize />} />
        </Routes>
      </Router>
    </ChoresProvider>
  );
}

export default App;