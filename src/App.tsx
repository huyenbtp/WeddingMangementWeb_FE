import './App.css';
import { BrowserRouter, useLocation } from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar'
import AppRoutes from "./routes/AppRoutes.tsx";
import Navbar from './components/Navbar/Navbar';
import Homepage from "./pages/Homepage/Homepage";
import { Box } from '@mui/material';

function App() {

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

// Create a new component to encapsulate the logic that needs useLocation
function AppContent() {
  const location = useLocation(); // Get current location
  const isHomepage = location.pathname === '/'; // Check if it's the homepage

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {!isHomepage && <Navbar />}
      {isHomepage ? (
        <Homepage />
      ) : (
        <div className='appContainer'>
          <Sidebar />
          <main className='content'>
            <AppRoutes />
          </main>
        </div>
      )}
    </Box>
  );
}

export default App
