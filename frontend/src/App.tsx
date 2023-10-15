import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './css/App.css';
import Profile from './pages/Profile';

import SongSearch from './pages/SongSearch';
import Header from './components/Header/Header';
import SongPage from './pages/SongPage';
import { useSelector } from 'react-redux';


function App() {
  const token = useSelector((state: any) => state.user.token);
  console.log(token);


  return (
    <div className="app">
    <HashRouter>
      <Header />  
      <div className="main_container">
          <Routes>
            <Route 
              path="/" 
              element={token? <SongSearch /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!token ? <Login /> : <Navigate to="/" />} 
            />
             <Route
                path="/register"
                element={!token ? <Register /> : <Navigate to="/" />}
              />
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="/song/:songId" element={<SongPage />} />
          </Routes>
        </div>
      </HashRouter>
      </div>
  );
}

export default App;