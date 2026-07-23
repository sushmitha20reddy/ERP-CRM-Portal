import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Right Content */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Navbar */}
          <Navbar setSidebarOpen={setSidebarOpen} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">

            <div className="w-full">

              <Outlet />

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}

export default MainLayout;