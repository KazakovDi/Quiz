import { Routes, Route } from "react-router-dom";

import Main from "./Pages/Main/Main";
import CreateQuiz from "./Pages/CreateQuiz/CreateQuiz";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AuthWrapper from "./Features/AuthWrapper/AuthWrapper";
import StartedQuiz from "./Features/StartedQuiz/StartedQuiz";

import { useEffect } from "react";
import { useAppDispatch } from "./Redux/store";
import { fetchAuthMe } from "./Redux/UserSlice";
import QuizTitleScreen from "./Pages/QuizTitleScreen/QuizTitleScreen";
import Question from "./Pages/Question/Question";
import QuizResults from "./Pages/QuizResults/QuizResults";
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
        <Route path="/" element={<AuthWrapper />}>
          <Route path="" element={<Main />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="start-quiz/:id" element={<StartedQuiz />}>
            <Route path="" element={<QuizTitleScreen />} />
            <Route path="results" element={<QuizResults />} />
            <Route path=":question" element={<Question />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
