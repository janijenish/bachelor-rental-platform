import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Property Details */}
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;