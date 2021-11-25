import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import { getUserData, isAuthenticated as isUser } from './services/authService';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MyPets from './components/MyPets';
import Details from './components/Details/Details'
import AddPet from './components/AddPet'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout';
import NotFound from './components/NotFound';

function App() {
  const [userData, setUserData] = useState({ isAuthenticated: false, user: {} })

  useEffect(() => {
    const data = getUserData();

    setUserData({
      isAuthenticated: isUser(),
      user: data,
    })

  }, [])

  function onLogin() {
    setUserData({
      isAuthenticated: true,
      user: getUserData()
    })
  }
  function onLogout() {
    setUserData({
      isAuthenticated: false,
      user: {}
    })
  }

  return (
    <div id="container">
      <Header {...userData} />

      <main id="site-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="my-pets" element={<MyPets />} />
          <Route path="my-pets/:userId" element={<MyPets />} />
          <Route path="pet/:petId/*" element={<Details userData={userData} />} />
          <Route path="add-pet" element={<AddPet userData={userData}/>} />
          <Route path="login" element={<Login onLogin={onLogin} />} />
          <Route path="register" element={<Register onRegister={onLogin} />} />
          <Route path="logout" element={<Logout onLogout={onLogout} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer id="site-footer">
        <p>@PetMyPet</p>
      </footer>
    </div>
  );
}

export default App;
