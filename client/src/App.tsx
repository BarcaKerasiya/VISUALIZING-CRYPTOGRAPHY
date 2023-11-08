import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import RSA from "./views/RSA";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="rsa" element={<RSA />} />
      </Routes>
    </>
  );
}

export default App;
