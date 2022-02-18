import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import Modal from './Modal';
import Home from './Home';
import User from './user/User';
import Register from './Register';
import Houses from './houses/Houses'
import SearchBar from './houses/SearchBar'

function App() {
  return (
    <div className="App">
        <ErrorBoundary fallback="Una ruta falla desde app">
          <Header/>
          <Modal />
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='user/*' element={<User />}/>
            <Route path="register" element={<Register />} />
            <Route path="register" element={<Register />} />
            <Route path="houses/*" element={<Houses />} />
          </Routes>
        </ErrorBoundary>
    </div>
  );
}

export default App;
