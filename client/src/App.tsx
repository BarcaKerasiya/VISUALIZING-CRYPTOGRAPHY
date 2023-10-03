import Sign from "./views/Sign";
import Navbar from "./components/Nanbar";
import { Routes, Route } from "react-router-dom";
import ED from "./views/ED";
import KeyGeneration from "./views/KeyGeneration";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="ed" element={<ED />} />
        <Route path="sign" element={<Sign />} />
        <Route path="key-generation" element={<KeyGeneration />} />
      </Routes>
    </>
  );
}

export default App;
