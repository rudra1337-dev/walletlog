import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./pages/Landing";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter> 
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="app-main">
      <Routes>
        <Route path="/" element={<Landing theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Landing theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
}
