import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
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

// Protected route component
function ProtectedRoute() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />; // Renders child routes when authenticated
}

// Layout component wrapping Navbar, Routes, and Footer
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the matched route */}
      <Footer />
    </>
  );
}

// Auth layout for pages without navbar/footer
function AuthLayout() {
  return <Outlet />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsVerifying(true);
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Invalid token
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
        setIsVerifying(false);
      });
    } else {
      setIsAuthenticated(false);
      setIsVerifying(false);
    }
  }, []);

  // Show loading while verifying token
  if (isVerifying) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth routes without navbar/footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />} />
          <Route path="/forget" element={<Forget />} />
        </Route>

        {/* Main app with layout (navbar/footer) */}
        <Route element={<Layout />}>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />

          </Route>
        </Route>

        {/* Redirect any other routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;