import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import AdminPanel from './pages/AdminPanel';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseItems from './pages/BrowseItems';
import Wishlist from './pages/Wishlist';
import NotAuthorized from './pages/NotAuthorized';
import HowItWorks from "./pages/HowItWorks";
import CategoriesPage from "./pages/CategoriesPage";
import EditProfile from "./pages/EditProfile";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-vh-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
