import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./contexts/UserContext.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/criar-conta" element={<Register />} />
          <Route path="/inicio" element={<Home />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
