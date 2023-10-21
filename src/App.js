import Login from './Pages/Login/Index';
import Transaction from './Pages/Dashbord/Transaction/Index';
import Dashboard from './Pages/Dashbord/Index';
import Layout from './Pages/Dashbord/LayOut/Index';
import Admin from './Pages/Dashbord/Admin/Index';
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
          <Route path='login' index element={<Login/>}/>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route index element={<Layout/>}/>
            <Route path='admin' element={<Admin/>}/>
            <Route path='transaction' element={<Transaction/>}/>
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
