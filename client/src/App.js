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
import SingleItem from "./pages/SingleItem";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";




function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-vh-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/item/:id" element={<SingleItem />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<BrowseItems />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
