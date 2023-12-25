import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './Pages/Login/Index';
import Dashboard from './Pages/Dashboard/Index';
import Admin from './Pages/Dashboard/Admin/Index';
import AlluserList from './Pages/Dashboard/Users/Alluser/List/Index';
import AlluserDetail from './Pages/Dashboard/Users/Alluser/Detail/Detail';
import Support from './Pages/Dashboard/Support/Index';
import GameList from './Pages/Dashboard/Games/List/Index';
import BundleList from './Pages/Dashboard/Products/Bundles/List/Index';
import BundleDetail from './Pages/Dashboard/Products/Bundles/Detail/Index';
import ItemList from './Pages/Dashboard/Products/Items/List/Index';
import ItemDetail from './Pages/Dashboard/Products/Items/Detail/Index';
import SHList from './Pages/Dashboard/ShoppingHistory/List/Index';
import SHDetail from './Pages/Dashboard/ShoppingHistory/Detail/Index';
import TransactionList from './Pages/Dashboard/Transaction/List/Index';
import TransactionDetail from './Pages/Dashboard/Transaction/Detail/Index';
import Played from './Pages/Dashboard/Games/Played/Played';
import Settings from './Pages/Dashboard/Games/Settings/Settings';
import Notfound from './Pages/NotFound/Notfound';
import Resources from './Pages/Dashboard/Games/Resources/Resources';
import Charts from './Pages/Dashboard/Charts/Charts';
import BanUserList from './Pages/Dashboard/Users/Banuser/List/Index';
import BanUserDetail from './Pages/Dashboard/Users/Banuser/Detail/Detail';
import ReportsList from './Pages/Dashboard/Users/Reports/List/List';
import { CookiesProvider, useCookies } from "react-cookie";
import './App.css';

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }
  
  return (
    <Routes>
      <Route path='/'>
        <Route path='login' index element={<Login />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<Charts />} />
          <Route path='admin' element={<Admin />} />
          <Route path='bundles' element={<BundleList />} />
          <Route path='bundles/:bundleId' element={<BundleDetail />} />
          <Route path='items' element={<ItemList />} />
          <Route path='items/:itemId' element={<ItemDetail />} />
          <Route path='transaction' element={<TransactionList />} />
          <Route path='transaction/:transactId' element={<TransactionDetail />} />
          <Route path='alluser' element={<AlluserList />} />
          <Route path='alluser/:user' element={<AlluserDetail />} />
          <Route path='reports' element={<ReportsList />} />
          <Route path='banuser' element={<BanUserList />} />
          <Route path='banuser/:id' element={<BanUserDetail />} />
          <Route path='shopping-history' element={<SHList />} />
          <Route path='shopping-history/:id' element={<SHDetail />} />
          <Route path='support' element={<Support />} />
          <Route path='games' element={<GameList />} />
          <Route path='games/played/:id' element={<Played />} />
          <Route path='games/settings/:id' element={<Settings />} />
          <Route path='games/settings/resources/:id' element={<Resources />} />
        </Route>
        <Route path='*' element={<Notfound />} />
      </Route>

    </Routes>
  );
}

export default App;
