import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Mensenger from "./pages/mensenger/Mensenger"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contex/AuthContex";



function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Register/>} />
        <Route path="/login" element={user ?< Navigate to={"/"}/> :<Login />} />
        <Route path="/register" element={user ? < Navigate to={"/"} /> : <Register />} />
        <Route path="/mensenger" element={!user ? < Navigate to={"/"} /> : <Mensenger />} />
        <Route path="/profile/:id" element={user ?<Profile /> : <Navigate to={'/'}/>} />
      </Routes>
    </Router>
  )
}

export default App;
 