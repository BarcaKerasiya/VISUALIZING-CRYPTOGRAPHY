import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import RSA from "./views/RSA";
// import Home from "./views/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RSA />} />
        <Route path="/rsa" element={<RSA />} />
      </Routes>
    </>
  );
}

export default App;
