import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Index';
import Dashboard from './Pages/Dashboard/Index';
import Layout from './Pages/Dashboard/LayOut/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import Users from './Pages/Dashboard/Users/Index';
import Support from './Pages/Dashboard/Support/Index';
import Games from './Pages/Dashboard/Games/Index';
import Bundles from './Pages/Dashboard/Products/Bundles/Bandles';
import BundleList from './Pages/Dashboard/Products/Bundles/BundleList/BundleList';
import BundleDetail from './Pages/Dashboard/Products/Bundles/BundleDetail/BundleDetail';
import Items from './Pages/Dashboard/Products/Items/Items';
import ItemList from './Pages/Dashboard/Products/Items/ItemList/ItemList';
import ItemDetail from './Pages/Dashboard/Products/Items/ItemDetail/ItemDetail';
import ShoppingHistory from './Pages/Dashboard/ShoppingHistory/ShoppingHistory';
import ShoppingHistoryList from './Pages/Dashboard/ShoppingHistory/ShoppingHistoryList/ShoppingHistoryList';
import ShoppingHistoryDetail from './Pages/Dashboard/ShoppingHistory/ShoppingHistoryDetail/ShoppingHistoryDetail';
import Transaction from './Pages/Dashboard/Transaction/Index';
import TransactionList from './Pages/Dashboard/Transaction/TransactionList/TransactionList';
import TransactionDetail from './Pages/Dashboard/Transaction/TransactionDetail/TransactionDetail';

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
              <Route index element={<BundleList/>} />
              <Route path=':bundleId' element={<BundleDetail />} />
            </Route>
            <Route path='items' element={<Items />}>
              <Route index element={<ItemList/>}/>
              <Route path=':itemId' element={<ItemDetail/>}/>
            </Route>
            <Route path='transaction' element={<Transaction />}>
              <Route index element={<TransactionList/>}/>
              <Route path=':transactId' element={<TransactionDetail/>}/>
            </Route>
            <Route path='users' element={<Users />} />
            <Route path='shopping-history' element={<ShoppingHistory/>}>
              <Route index element={<ShoppingHistoryList/>}/>
              <Route path=':historyId' element={<ShoppingHistoryDetail/>}/>
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
