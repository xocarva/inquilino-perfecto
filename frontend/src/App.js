import { Route, Routes } from 'react-router-dom'
import './App.css'
import ErrorBoundary from './ErrorBoundary'
import Header from './Header'
import Modal from './Modal'
import Home from './Home'
import User from './user/User'
import Register from './Register'
import Houses from './houses/Houses'
import Oops from './Oops'
import Activate from './Activate'
import Footer from './Footer'

function App() {
  return (
    <div className="App">
        <ErrorBoundary fallback={<Oops />}>
          <Header/>
          <Modal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='user/*' element={<User />}/>
            <Route path="register" element={<Register />} />
            <Route path="register" element={<Register />} />
            <Route path="houses/*" element={<Houses />} />
            <Route path="activate/:code" element={<Activate />} />
            <Route path="*" element={<Oops />} />
          </Routes>
        </ErrorBoundary>
        <Footer/>
    </div>
  )
}

export default App
