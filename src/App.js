import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Index';
import Dashboard from './Pages/Dashboard/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import Alluser from './Pages/Dashboard/Users/Alluser/Alluser';
import AlluserList from './Pages/Dashboard/Users/Alluser/List/Index';
import AlluserDetail from './Pages/Dashboard/Users/Alluser/Detail/Detail';
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
import Played from './Pages/Dashboard/Games/Played/Played';
import Settings from './Pages/Dashboard/Games/Settings/Settings';

import Notfound from './Pages/NotFound/Notfound';
import Resources from './Pages/Dashboard/Games/Resources/Resources';
import Charts from './Pages/Dashboard/Charts/Charts';

import './App.css';
import Banuser from './Pages/Dashboard/Users/Banuser/Banuser';
import BanuserList from './Pages/Dashboard/Users/Banuser/List/Index';
import BanuserDetail from './Pages/Dashboard/Users/Banuser/Detail/Detail';

import Reports from './Pages/Dashboard/Users/Reports/Reports';
import ReportsList from './Pages/Dashboard/Users/Reports/List/List';


function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route path='login' index element={<Login />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<Charts />} />
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
          <Route path='alluser' element={<Alluser/>}>
            <Route index element={<AlluserList/>} />
            <Route path=':user' element={<AlluserDetail/>}/>
          </Route>

          <Route path='reports' element={<Reports/>}>
            <Route index element={<ReportsList/>}/>
          </Route>

          <Route path='banuser' element={<Banuser/>}>
            <Route index element={<BanuserList/>}/>
            <Route path=':banuser' element={<BanuserDetail/>}/>
          </Route>
          <Route path='shopping-history' element={<ShoppingHistory />}>
            <Route index element={<SHList />} />
            <Route path=':historyId' element={<SHDetail />} />
          </Route>
          <Route path='support' element={<Support />} />
          <Route path='games' element={<Games />}>
            <Route index element={<GameList />} />
          </Route>
          <Route path='played/ludo' element={<Played/>}/>
          <Route path='settings/backgammon' element={<Settings/>}/>
          <Route path='settings/resources/backgammon' element={<Resources/>}/>
        </Route>
      </Route>
      <Route path='*' element={<Notfound />} />
    </Routes>
  );
}

export default App;
