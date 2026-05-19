import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import './index.css';

import Header from './components/Home/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import AgentDashboard from './components/AgentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Reports from './components/Reports';
import ChatWidget from './components/Home/ChatWidget';

function App() {
  return (
    <Router>
      <div className="App">
        {/* ✅ Global Toast Container (works anywhere in app) */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"   // use "light" or "dark" if you prefer
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header />
                <Hero />
                <Features />
                <Stats />
                <HowItWorks />
                <Testimonials />
                <CTA />
                <Footer />
                <ChatWidget />
              </>
            } 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* <Route path="/reports" element={<Reports />} /> */}
          {/* Catch-all route - redirects to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;