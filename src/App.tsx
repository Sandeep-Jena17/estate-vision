import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { GLOBAL_STYLES } from './styles/global';

// Page imports
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertiesPage from './pages/PropertiesPage';
import AgentsPage from './pages/AgentsPage';
import ProjectsPage from './pages/ProjectsPage';

/**
 * Root App Component
 * Main application entry point with React Router
 */

function App() {
  return (
    <Router>
      <style>{GLOBAL_STYLES}</style>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />

            {/* Properties Routes */}
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />

            {/* Other Routes */}
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />

            {/* Fallback Route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
