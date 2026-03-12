// ─────────────────────────────────────────────────────────────
//  App.js  —  EstateVision  |  Full Router + State Manager
//
//  Pages wired:
//    /           → HomePage          (already built)
//    /listings   → SearchListingsPage ← NEW
//    /property   → PropertyDetailPage ← NEW
//    /dashboard  → UserDashboardPage  ← NEW
//    /agent      → AgentProfilePage   ← NEW
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import "./App.css";

// ── Existing pages ──────────────────────────
import HomePage       from "./pages/HomePage";

// ── New pages (add these files to src/pages/) ──
import SearchListingsPage from "./pages/SearchListingsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import UserDashboardPage  from "./pages/UserDashboardPage";
import AgentProfilePage   from "./pages/AgentProfilePage";

// ── Shared layout ───────────────────────────
import Header  from "./components/Header";   // your existing nav
import Footer  from "./components/Footer";   // optional

export default function App() {
  // ── ROUTING STATE ───────────────────────────────────────────
  // Simple in-app router — replace with React Router v6 when ready
  const [page,          setPage]         = useState("home");
  const [selectedProp,  setSelectedProp] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // ── GLOBAL WISHLIST STATE ───────────────────────────────────
  // Persisted in memory; swap localStorage / API later
  const [savedIds, setSavedIds] = useState([]);

  const toggleSave = useCallback((id) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  // ── NAVIGATION HELPERS ──────────────────────────────────────
  const goHome = useCallback(() => {
    setPage("home");
    setSelectedProp(null);
    window.scrollTo(0, 0);
  }, []);

  const goListings = useCallback(() => {
    setPage("listings");
    setSelectedProp(null);
    window.scrollTo(0, 0);
  }, []);

  const goProperty = useCallback((property) => {
    setSelectedProp(property);
    setPage("property");
    window.scrollTo(0, 0);
  }, []);

  const goDashboard = useCallback(() => {
    setPage("dashboard");
    window.scrollTo(0, 0);
  }, []);

  const goAgent = useCallback((agent = null) => {
    setSelectedAgent(agent);
    setPage("agent");
    window.scrollTo(0, 0);
  }, []);

  // ── RENDER ──────────────────────────────────────────────────
  return (
    <>
      {/* ── Global Navigation ── */}
      <Header
        currentPage={page}
        onGoHome={goHome}
        onGoListings={goListings}
        onGoDashboard={goDashboard}
        savedCount={savedIds.length}
      />

      {/* ── Page Switcher ── */}
      {page === "home" && (
        <HomePage
          onGoListings={goListings}
          onSelectProperty={goProperty}
        />
      )}

      {page === "listings" && (
        <SearchListingsPage
          onSelectProperty={goProperty}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />
      )}

      {page === "property" && selectedProp && (
        <PropertyDetailPage
          property={selectedProp}
          onBack={goListings}
          onSelectSimilar={goProperty}
          saved={savedIds.includes(selectedProp.id)}
          onToggleSave={() => toggleSave(selectedProp.id)}
        />
      )}

      {page === "dashboard" && (
        <UserDashboardPage
          savedIds={savedIds}
          onSelectProperty={goProperty}
          onToggleSave={toggleSave}
        />
      )}

      {page === "agent" && (
        <AgentProfilePage
          agent={selectedAgent}
          onSelectProperty={goProperty}
          onBack={goListings}
        />
      )}
    </>
  );
}


// ─────────────────────────────────────────────────────────────
//  OPTIONAL: Upgrade to React Router v6
//  Run: npm install react-router-dom
//  Then replace App.js with this version:
// ─────────────────────────────────────────────────────────────
/*
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";

function AppWithRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/properties"    element={<SearchListingsPage />} />
        <Route path="/property/:id"  element={<PropertyDetailPage />} />
        <Route path="/dashboard"     element={<UserDashboardPage />} />
        <Route path="/agent/:id"     element={<AgentProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
*/
