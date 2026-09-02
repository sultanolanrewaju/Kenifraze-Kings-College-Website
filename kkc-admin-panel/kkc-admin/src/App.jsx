// src/App.jsx
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Instructors from "./pages/Instructors";
import Events from "./pages/Events";
import Academics from "./pages/Academics";
import Donators from "./pages/Donators";
import ContactSettings from "./pages/ContactSettings";

// Swap this for react-router if the host app already uses it —
// pages are plain components with no router dependency.
const PAGES = {
  dashboard: Dashboard,
  instructors: Instructors,
  events: Events,
  academics: Academics,
  donators: Donators,
  contact: ContactSettings,
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const ActivePageComponent = PAGES[activePage] || Dashboard;

  return (
    <QueryClientProvider client={queryClient}>
      <AdminLayout activePage={activePage} onNavigate={setActivePage}>
        <ActivePageComponent onNavigate={setActivePage} />
      </AdminLayout>
    </QueryClientProvider>
  );
}
