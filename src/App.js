import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Error404 from "./components/error-page/Error404";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Detail from "./components/Detail";
import Homepage from "./components/Homepage";
import About_Us from "./components/About_Us";
import Contact from "./components/Contact";
import TodoList from "./components/Todolist";
import AccountProfile from "./components/AccountProfile";
import ChangePassword from "./components/ChangePassword";
import EditDetail from "./components/UpdateDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homepage" element={<TodoList />} />
          <Route path="/error-404" element={<Error404 />} />
          <Route path="/todo/add/" element={<Create />} />
          <Route path="/todo/edit/:pid" element={<Edit />} />
          <Route path="/about_us" element={<About_Us />} />
          <Route path="/contact_support" element={<Contact />} />
          <Route path="/account-profile" element={<AccountProfile />} />
          <Route path="/setting" element={<ChangePassword />} />
          <Route path="/todo/detail/:id" element={<Detail />} />
          <Route path="/todo/detail/update/:id" element={<EditDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
