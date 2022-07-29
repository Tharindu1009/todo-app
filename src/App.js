import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';
import Login from "./pages/login";
import TodoList from "./pages/todo-list";

function App() {

  const history = createBrowserHistory({ basename: '/' });

  const routes = (
    <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/todos" element={<TodoList/>} />
          <Route exact path="*" element={<Login/>} />
    </Routes>
  );

  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}

export default App;