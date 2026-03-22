import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { AuthProvider }   from './context/AuthContext';
import ProtectedRoute     from './components/common/ProtectedRoute';
import './styles/main.css';

// Page imports
import HomePage           from './pages/HomePage';
import ListingsPage       from './pages/ListingsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertiesPage     from './pages/PropertiesPage';
import AgentsPage         from './pages/AgentsPage';
import ProjectsPage       from './pages/ProjectsPage';
import AgentProfilePage   from './pages/AgentProfilePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import SearchListingsPage from './pages/SearchListingsPage';
import UserDashboardPage  from './pages/UserDashboardPage';
import AuthPage           from './pages/AuthPage';

/** Placeholder until AdminPanelPage is built next sprint */
const AdminPlaceholder: React.FC = () => (
  <div style={{
    minHeight:       'calc(100vh - var(--nav-h))',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    flexDirection:   'column',
    gap:             16,
    padding:         24,
    textAlign:       'center',
  }}>
    <div style={{ fontSize: 48 }}>🏗️</div>
    <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', margin: 0 }}>
      Agent Admin Panel
    </h2>
    <p style={{ color: 'var(--muted)', maxWidth: 360 }}>
      Coming in the next sprint — add listings, manage leads, and view analytics.
    </p>
  </div>
);

function AppInner() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          {/* ── Public routes ─────────────────────────── */}
          <Route path="/"              element={<HomePage />}             />
          <Route path="/home"          element={<HomePage />}             />
          <Route path="/listings"      element={<ListingsPage />}         />
          <Route path="/search"        element={<SearchListingsPage />}   />
          <Route path="/properties"    element={<PropertiesPage />}       />
          <Route path="/property/:id"  element={<PropertyDetailsPage />}  />
          <Route path="/property-detail" element={<PropertyDetailPage />} />
          <Route path="/agents"        element={<AgentsPage />}           />
          <Route path="/agent/:id"     element={<AgentProfilePage />}     />
          <Route path="/agent-profile" element={<AgentProfilePage />}     />
          <Route path="/projects"      element={<ProjectsPage />}         />
          <Route path="/auth"          element={<AuthPage />}             />

          {/* ── Buyer protected ───────────────────────── */}
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

          {/* ── Agent + Admin protected ───────────────── */}
          <Route path="/admin" element={
            <ProtectedRoute role="agent">
              <AdminPlaceholder />
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute role="agent">
              <AdminPlaceholder />
            </ProtectedRoute>
          } />

          {/* ── Fallback ──────────────────────────────── */}
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
