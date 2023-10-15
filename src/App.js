import Login from './Pages/Login/Index';
import Dashbord from './Pages/Dashbord/Index';
import Admin from './Pages/Dashbord/Admin/Index';
import Inbox from './Pages/Dashbord/Inbox/Index';
import Users from './Pages/Dashbord/Users/Index';
import Support from './Pages/Dashbord/Support/Index';
import Games from './Pages/Dashbord/Games/Index';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='login/' index element={<Login/>}/>
          <Route path='dashboard' element={<Dashbord/>}>
            <Route path='admin' element={<Admin/>}/>
            <Route path='inbox' element={<Inbox/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='support' element={<Support/>}/>
            <Route path='games' element={<Games/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
