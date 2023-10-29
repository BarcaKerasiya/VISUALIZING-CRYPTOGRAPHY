import Navbar from "./components/Nanbar";
import { Routes, Route } from "react-router-dom";
import KeyGeneration from "./views/KeyGeneration";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="key-generation" element={<KeyGeneration />} />
      </Routes>
    </>
  );
}

export default App;
