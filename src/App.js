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

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/blogs' element={<RequireAuth> <Blog /></RequireAuth>} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
