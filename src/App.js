import { Route, Routes } from 'react-router-dom';

import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Header from './Pages/Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Blog from './Pages/Blog/Blog';
import Portfolio from './Pages/Portfolio/Portfolio';
import RequireAuth from './Pages/Components/RequireAuth/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import Footer from './Pages/Components/Footer/Footer';
import AddProduct from './Pages/Dashboard/AddProduct';
import AddReview from './Pages/Dashboard/AddReview';
import ManageOrders from './Pages/Dashboard/ManageOrders';
import ManageProducts from './Pages/Dashboard/ManageProducts';
import MyOrders from './Pages/Dashboard/MyOrders';
import Profile from './Pages/Dashboard/Profile';
import Products from './Pages/Products/Products';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<MyOrders />} ></Route>
          <Route path='add-review' element={<RequireAuth><AddReview /></RequireAuth>} ></Route>
          <Route path='my-profile' element={<RequireAuth><Profile /></RequireAuth>} ></Route>
          <Route path='manage-all-orders' element={<RequireAuth><ManageOrders /></RequireAuth>} ></Route>
          <Route path='add-product' element={<RequireAuth><AddProduct /></RequireAuth>} ></Route>
          <Route path='manage-products' element={<RequireAuth><ManageProducts /></RequireAuth>} ></Route>
        </Route>
        <Route path='/blogs' element={<RequireAuth> <Blog /></RequireAuth>} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/purchase' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
