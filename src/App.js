import Login from './Pages/Login/Index';
import Transaction from './Pages/Dashboard/Transaction/Index';
import Dashboard from './Pages/Dashboard/Index';
import Layout from './Pages/Dashboard/LayOut/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import Users from './Pages/Dashboard/Users/Index';
import Support from './Pages/Dashboard/Support/Index';
import Games from './Pages/Dashboard/Games/Index';
import Bandels from './Pages/Dashboard/Products/Bandels/Index';
import Items from './Pages/Dashboard/Products/Items/Index';

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
            <Route path='products'>
              <Route path='addbandel' element={<Bandels/>}/>
              <Route path='additem' element={<Items/>}/>
            </Route>
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
