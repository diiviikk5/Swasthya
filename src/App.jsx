import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/landing';
import Dashboard from './pages/dashboard';
import SymptomLogger from './pages/SymptomLogger';
import Budh from './pages/Budh';
import Joy from './pages/joy';
import Comm from './pages/Comm';
import Navbar from './components/Navbar';

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/SymptomLogger" element={<SymptomLogger />} />
        <Route path="/DharmaChatbot" element={<Budh />} />
        <Route path="/JoyTracker" element={<Joy />} />
        <Route path="/Community" element={<Comm />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
