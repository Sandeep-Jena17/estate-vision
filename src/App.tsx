import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { AuthProvider }   from './context/AuthContext';
import ProtectedRoute     from './components/common/ProtectedRoute';
import './styles/main.css';

// Page imports
import HomePage            from './pages/HomePage';
import ListingsPage        from './pages/ListingsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertiesPage      from './pages/PropertiesPage';
import AgentsPage          from './pages/AgentsPage';
import ProjectsPage        from './pages/ProjectsPage';
import AgentProfilePage    from './pages/AgentProfilePage';
import PropertyDetailPage  from './pages/PropertyDetailPage';
import SearchListingsPage  from './pages/SearchListingsPage';
import UserDashboardPage   from './pages/UserDashboardPage';
import AgentDashboardPage  from './pages/AgentDashboardPage';
import AdminDashboardPage  from './pages/AdminDashboardPage';
import AuthPage            from './pages/AuthPage';

function AppInner() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          {/* ── Public routes ─────────────────────────────── */}
          <Route path="/"                element={<HomePage />}             />
          <Route path="/home"            element={<HomePage />}             />
          <Route path="/listings"        element={<ListingsPage />}         />
          <Route path="/search"          element={<SearchListingsPage />}   />
          <Route path="/properties"      element={<PropertiesPage />}       />
          <Route path="/property/:id"    element={<PropertyDetailsPage />}  />
          <Route path="/property-detail" element={<PropertyDetailPage />}   />
          <Route path="/agents"          element={<AgentsPage />}           />
          <Route path="/agent/:id"       element={<AgentProfilePage />}     />
          <Route path="/agent-profile"   element={<AgentProfilePage />}     />
          <Route path="/projects"        element={<ProjectsPage />}         />
          <Route path="/auth"            element={<AuthPage />}             />

          {/* ── Buyer — any logged-in user ─────────────────── */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/user-dashboard" element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          } />

          {/* ── Agent — role: agent only ───────────────────── */}
          <Route path="/agent" element={
            <ProtectedRoute role="agent">
              <AgentDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/agent/*" element={
            <ProtectedRoute role="agent">
              <AgentDashboardPage />
            </ProtectedRoute>
          } />

          {/* ── Admin — role: admin only ───────────────────── */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute role="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          } />

          {/* ── Fallback ──────────────────────────────────── */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}
