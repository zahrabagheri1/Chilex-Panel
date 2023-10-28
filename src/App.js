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
import Bandel from './Pages/Dashboard/Products/Bandels/Bandel/Bandel';
import Items from './Pages/Dashboard/Products/Items/Items';
import Item from './Pages/Dashboard/Products/Items/Item/Item';
import Details from './Pages/Dashboard/Products/Bandels/Details/Details';

import './App.css';

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
              <Route index element={<Bandel/>} />
              <Route path=':bandelId' element={<Details />} />
            </Route>
            <Route path='items' element={<Items />}>
              <Route index element={<Item/>}/>
              {/* <Route path=':itemId' element={<Details/>}/> */}
            </Route>
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
