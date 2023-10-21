import Login from './Pages/Login/Index';
import Dashboard from './Pages/Dashboard/Index';
import Layout from './Pages/Dashboard/LayOut/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import Inbox from './Pages/Dashboard/Inbox/Index';
import Users from './Pages/Dashboard/Users/Index';
import Support from './Pages/Dashboard/Support/Index';
import Games from './Pages/Dashboard/Games/Index';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='login/' index element={<Login/>}/>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route index element={<Layout/>}/>
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
