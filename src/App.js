import './App.css';
import {Homepage, Loginpage, Dashboard, Register} from './Pages'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Loginpage />}/>
      <Route path="login" element={<Loginpage />}/>
      <Route path="register" element={<Register />}/>
      <Route path="dashboard" element={<Dashboard />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
