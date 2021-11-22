import { Routes, Route } from 'react-router';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MyPets from './components/MyPets';
import Details from './components/Details'
import AddPet from './components/AddPet'
import EditPet from './components/EditPet'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <div id="container">
      <Header />

      <main id="site-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="my-pets/:userId" element={<MyPets />} />
          <Route path="details/:petId" element={<Details />} />
          <Route path="add-pet" element={<AddPet />} />
          <Route path="edit-pet/:petId" element={<EditPet />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </main>

      <footer id="site-footer">
        <p>@PetMyPet</p>
      </footer>
    </div>
  );
}

export default App;
