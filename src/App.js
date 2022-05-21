
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Pages/Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Blog from './Pages/Blog/Blog';
import Portfolio from './Pages/Portfolio/Portfolio';
import RequireAuth from './Pages/Components/RequireAuth/RequireAuth';




function App() {
  return (
    <div className='app'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/dashboard' element={< />} /> */}
        <Route path='/blogs' element={<RequireAuth> <Blog /></RequireAuth>} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </div>
  );
}

export default App;
