import { Routes, Route } from "react-router-dom";

import Main from "./Pages/Main/Main";
import CreateQuiz from "./Pages/CreateQuiz/CreateQuiz";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import RequireAuth from "./Features/RequireAuth/RequireAuth";
import { useEffect } from "react";
import { useAppDispatch } from "./Redux/store";
import { fetchAuthMe } from "./Redux/UserSlice";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <CreateQuiz />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
