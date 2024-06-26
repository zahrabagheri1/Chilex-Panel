import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Index';
import Dashboard from './Pages/Dashboard/Index';
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
import BanUserList from './Pages/Dashboard/Users/Banuser/Index';
import Notification from './Pages/Dashboard/Notifications/Notification/Index';
import Dialog from './Pages/Dashboard/Notifications/Dialog/Index';
import ReportsList from './Pages/Dashboard/Users/Reports/List/List';
import LoadingProvider from './Pages/Loading/LoadingProvider';
import LoginProvider from './Pages/Login/LoginProvider';
import { useCookies } from "react-cookie";
import './App.scss';

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return (
    <LoadingProvider>
      <LoginProvider>
        <div className='routers'>
          <Routes>
            <Route path='/'>
              <Route index element={<Login />} />
              <Route path='dashboard' element={<Dashboard />}>
                <Route index element={<Charts />} />
                <Route path='bundles' element={<BundleList />} />
                <Route path='bundles/:id' element={<BundleDetail />} />
                <Route path='items' element={<ItemList />} />
                <Route path='items/:id' element={<ItemDetail />} />
                <Route path='transaction' element={<TransactionList />} />
                <Route path='transaction/:id' element={<TransactionDetail />} />
                <Route path='alluser' element={<AlluserList />} />
                <Route path='alluser/:id' element={<AlluserDetail />} />
                <Route path='reports' element={<ReportsList />} />
                <Route path='banuser' element={<BanUserList />} />
                <Route path='shopping-history' element={<SHList />} />
                <Route path='shopping-history/:id' element={<SHDetail />} />
                <Route path='Notification' element={<Notification/>}/>
                <Route path='Dialog' element={<Dialog/>}/>
                <Route path='support' element={<Support />} />
                <Route path='games' element={<GameList />} />
                <Route path='games/played/:id' element={<Played />} />
                <Route path='games/settings/:id' element={<Settings />} />
                <Route path='games/settings/resources/:id' element={<Resources />} />
              </Route>
              <Route path='*' element={<Notfound />} />
            </Route>
          </Routes>
        </div>
      </LoginProvider>
    </LoadingProvider>
  );
}

export default App;
