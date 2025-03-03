// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Home from "./Pages/Home";
// import KYC from "./Pages/KYCv";
// import KycRegister from "./Pages/kycRegister";
// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
// import RegisterPage from "./Pages/RegisterPage";
// import Login from "./Pages/Login";
// import Forget from "./Pages/Forget";

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/Login" replace />;
// };

// // Layout component wrapping Navbar, Routes, and Footer
// function Layout() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Protected Routes */}
//         <Route path="/" element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         } />
//         <Route path="/kyc" element={
//           <ProtectedRoute>
//             <KYC />
//           </ProtectedRoute>
//         } />
//         <Route path="/kycRegister" element={
//           <ProtectedRoute>
//             <KycRegister />
//           </ProtectedRoute>
//         } />

//         {/* Public Routes */}
//         <Route path="/RegisterPage" element={<RegisterPage />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Forget" element={<Forget />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// function App() {
//   // Check authentication status when app loads
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Optional: Verify token validity with backend
//       fetch('http://localhost:5000/api/auth/verify', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }).catch(err => {
//         console.error('Token verification failed:', err);
//         localStorage.removeItem('token');
//       });
//     }
//   }, []);

//   return (
//     <Router>
//       <ScrollToTop />
//       <Layout />
//     </Router>
//   );
// }

// export default App;











import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import KYC from "./Pages/KYCv";
import KycRegister from "./Pages/kycRegister";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RegisterPage from "./Pages/RegisterPage";
import Login from "./Pages/Login";
import Forget from "./Pages/Forget";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout component wrapping Navbar, Routes, and Footer
function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* All Routes accessible regardless of auth status */}
        <Route path="/" element={<Home />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/kycRegister" element={<KycRegister />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forget" element={<Forget />} />
        {/* Add any additional routes here */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  // Keep token verification for login/logout functionality
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch(err => {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
      });
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

export default App;