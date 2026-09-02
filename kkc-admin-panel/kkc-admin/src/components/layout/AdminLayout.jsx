// src/components/layout/AdminLayout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ activePage, onNavigate, children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleNavigate = (key) => {
    onNavigate(key);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-parchment dark:bg-ink-deep lg:flex">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header activePage={activePage} onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main key={activePage} className="view-transition flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
