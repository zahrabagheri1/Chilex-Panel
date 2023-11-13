import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Index';
import Dashboard from './Pages/Dashboard/Index';
import Layout from './Pages/Dashboard/LayOut/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import Users from './Pages/Dashboard/Users/Index';
import Support from './Pages/Dashboard/Support/Index';
import Games from './Pages/Dashboard/Games/Index';
import GameList from './Pages/Dashboard/Games/List/Index';
import Bundles from './Pages/Dashboard/Products/Bundles/Index';
import BundleList from './Pages/Dashboard/Products/Bundles/List/Index';
import BundleDetail from './Pages/Dashboard/Products/Bundles/Detail/Index';
import Items from './Pages/Dashboard/Products/Items/Index';
import ItemList from './Pages/Dashboard/Products/Items/List/Index';
import ItemDetail from './Pages/Dashboard/Products/Items/Detail/Index';
import ShoppingHistory from './Pages/Dashboard/ShoppingHistory/Index';
import SHList from './Pages/Dashboard/ShoppingHistory/List/Index';
import SHDetail from './Pages/Dashboard/ShoppingHistory/Detail/Index';
import Transaction from './Pages/Dashboard/Transaction/Index';
import TransactionList from './Pages/Dashboard/Transaction/List/Index';
import TransactionDetail from './Pages/Dashboard/Transaction/Detail/Index';

import './App.css';
import Setting from './Pages/Dashboard/Games/Game/Setting/Setting';
import Game from './Pages/Dashboard/Games/Game/Game';

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
              <Route index element={<BundleList />} />
              <Route path=':bundleId' element={<BundleDetail />} />
            </Route>
            <Route path='items' element={<Items />}>
              <Route index element={<ItemList />} />
              <Route path=':itemId' element={<ItemDetail />} />
            </Route>
            <Route path='transaction' element={<Transaction />}>
              <Route index element={<TransactionList />} />
              <Route path=':transactId' element={<TransactionDetail />} />
            </Route>
            <Route path='users' element={<Users />} />
            <Route path='shopping-history' element={<ShoppingHistory />}>
              <Route index element={<SHList />} />
              <Route path=':historyId' element={<SHDetail />} />
            </Route>
            <Route path='support' element={<Support />} />
            <Route path='games' element={<Games />}>
              <Route index element={<GameList />} />
              <Route path='settings' element={<Game />}>
                <Route path=':gameName' index element={<Setting />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
