import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import Modal from './Modal';
import Home from './Home';
import Houses from './houses/Houses';
import Register from './Register';
import SearchBar from './SearchBar';
import User from './user/User';


function App() {
  return (
    <div className="App">
        <ErrorBoundary fallback="Una ruta falla desde app">
          <Header/>
          <Modal />
          <SearchBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='user/*' element={<User />}/>
            <Route path="register" element={<Register />} />
            <Route path="houses" element={<Houses />} />
          </Routes>
        </ErrorBoundary>
    </div>
  );
}

export default App;
