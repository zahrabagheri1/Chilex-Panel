import Login from './Pages/Login/Index';
// import Login from './Pages/Login/Login';
import Dashbord from './Pages/Dashbord/Index';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashbord/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
