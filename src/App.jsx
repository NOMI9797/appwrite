import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import Home from './components/Home';
import { account } from './appwrite/config';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const session = await account.getSession('current');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route 
          path="/" 
          element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/" /> : 
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? 
            <Navigate to="/" /> : 
            <SignupForm setIsAuthenticated={setIsAuthenticated} />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
