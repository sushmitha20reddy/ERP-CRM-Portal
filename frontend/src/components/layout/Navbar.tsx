import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  setSidebarOpen: (value: boolean) => void;
}

function Navbar({ setSidebarOpen }: NavbarProps) {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/customers": "Customers",
    "/products": "Products",
    "/inventory": "Inventory",
    "/challans": "Challans",
  };

  const title = titles[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">

      <div className="flex h-16 items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-slate-800">
              {title}
            </h1>

            <p className="text-sm text-slate-500">
              Welcome back 👋
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="relative hidden lg:block">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Search..."
              className="
                w-72
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                py-2.5
                pl-11
                pr-4
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
              "
            />

          </div>

          {/* Notification */}

          <button className="relative rounded-2xl border border-slate-200 p-2.5 hover:bg-slate-100">

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          {/* User */}

          <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">

            <img
              src={`https://ui-avatars.com/api/?name=${
                user.name || "User"
              }&background=6366f1&color=fff`}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />

            <div className="hidden text-left lg:block">

              <p className="text-sm font-semibold text-slate-800">
                {user.name || "User"}
              </p>

              <p className="text-xs text-slate-500">
                {user.role || "Employee"}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="hidden lg:block text-slate-500"
            />

          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;