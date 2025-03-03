

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Home from "./Pages/Home";
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

// // Layout component wrapping Navbar, Routes, and Footer
// function Layout() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* All Routes accessible regardless of auth status */}
//         <Route path="/" element={<Home />} />
//         <Route path="/RegisterPage" element={<RegisterPage />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Forget" element={<Forget />} />
//         {/* Add any additional routes here */}
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// function App() {
//   // Keep token verification for login/logout functionality
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
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
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RegisterPage from "./Pages/RegisterPage";
import Login from "./Pages/Login";
import Forget from "./Pages/Forget";
import ResetPassword from "./Pages/ResetPassword";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if no token exists
    return <Navigate to="/Login" replace />;
  }
  return children;
}

// Layout component with routing
function Layout({ isAuthenticated }) {
  return (
    <>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      })
      .catch(err => {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout isAuthenticated={isAuthenticated} />
    </Router>
  );
}

export default App;