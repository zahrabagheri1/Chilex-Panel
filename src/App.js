import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Index';
import Transaction from './Pages/Dashboard/Transaction/Index';
import Dashboard from './Pages/Dashboard/Index';
import Layout from './Pages/Dashboard/LayOut/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import Users from './Pages/Dashboard/Users/Index';
import Support from './Pages/Dashboard/Support/Index';
import Games from './Pages/Dashboard/Games/Index';
import Bandels from './Pages/Dashboard/Products/Bandels/Bandels';
import Items from './Pages/Dashboard/Products/Items/Items';

import './App.css';
import Details from './Pages/Dashboard/Products/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='login' index element={<Login />} />
          <Route path='dashboard' element={<Dashboard />}>
            <Route index element={<Layout />} />
            <Route path='admin' element={<Admin />} />
            <Route path='bandels' element={<Bandels />}>
              <Route path='detail' element={<Details />} />
            </Route>
            <Route path='items' element={<Items />} />
            <Route path='transaction' element={<Transaction />} />
            <Route path='users' element={<Users />} />
            <Route path='support' element={<Support />} />
            <Route path='games' element={<Games />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
