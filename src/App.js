import './App.css';
import {Homepage, Loginpage, Dashboard, Register, Doctor, DoctorLogin} from './Pages'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="login" element={<Loginpage />}/>
      <Route path="register" element={<Register />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="doctor" element={<Doctor />}/>
      <Route path="dlogin" element={<DoctorLogin />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
