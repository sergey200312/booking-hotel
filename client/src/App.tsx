
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Main } from './pages/Main'
import { RoomPage } from './pages/RoomPage'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { PrivateRouter } from './components/PrivateRouter'
import { MyBookings } from './pages/MyBookings'
import { FavoriteRooms } from './pages/FavoriteRooms'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 


const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path ='/favorite-rooms' element={<FavoriteRooms />} />
        </Route>
        <Route path='/' element={<Main />} />
        <Route path='/room/:id' element={<RoomPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
