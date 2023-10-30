import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Index';
import Transaction from './Pages/Dashboard/Transaction/Index';
import Dashboard from './Pages/Dashboard/Index';
import Layout from './Pages/Dashboard/LayOut/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import Users from './Pages/Dashboard/Users/Index';
import Support from './Pages/Dashboard/Support/Index';
import Games from './Pages/Dashboard/Games/Index';
import Bundles from './Pages/Dashboard/Products/Bundles/Bandles';
import Bundle from './Pages/Dashboard/Products/Bundles/Bundle/Bundle';
import Items from './Pages/Dashboard/Products/Items/Items';
import Item from './Pages/Dashboard/Products/Items/Item/Item';
import BundleDetail from './Pages/Dashboard/Products/Bundles/Details/Details';
import ItemDetail from './Pages/Dashboard/Products/Items/Details/Details';
import ShoppingHistory from './Pages/Dashboard/ShoppingHistory/ShoppingHistory';
import ShoppingHistoryAll from './Pages/Dashboard/ShoppingHistory/ShoppingHistoryAll/ShoppingHistoryAll';
import ShoppingHistoryID from './Pages/Dashboard/ShoppingHistory/ShoppingHistoryID/ShoppingHistoryID';

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
            <Route path='bundles' element={<Bundles />}>
              <Route index element={<Bundle/>} />
              <Route path=':bundleId' element={<BundleDetail />} />
            </Route>
            <Route path='items' element={<Items />}>
              <Route index element={<Item/>}/>
              <Route path=':itemId' element={<ItemDetail/>}/>
            </Route>
            <Route path='transaction' element={<Transaction />} />
            <Route path='users' element={<Users />} />
            <Route path='shopping-history' element={<ShoppingHistory/>}>
              <Route index element={<ShoppingHistoryAll/>}/>
              <Route path=':historyId' element={<ShoppingHistoryID/>}/>
              <Route/>
            </Route>
            <Route path='support' element={<Support />} />
            <Route path='games' element={<Games />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
