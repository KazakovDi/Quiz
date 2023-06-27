import { Routes, Route } from "react-router-dom";

import Main from "./Pages/Main/Main";
import CreateQuiz from "./Pages/CreateQuiz/CreateQuiz";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<CreateQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
