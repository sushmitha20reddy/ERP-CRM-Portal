import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  FileText,
  LogOut,
  Building2,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["ADMIN", "SALES", "WAREHOUSE", "ACCOUNTS"],
    },
    {
      name: "Customers",
      path: "/customers",
      icon: Users,
      roles: ["ADMIN", "SALES"],
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
      roles: ["ADMIN", "SALES", "WAREHOUSE", "ACCOUNTS"],
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Boxes,
      roles: ["ADMIN", "WAREHOUSE"],
    },
    {
      name: "Challans",
      path: "/challans",
      icon: FileText,
      roles: ["ADMIN", "SALES", "ACCOUNTS"],
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <>
      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-40
          w-64
          bg-white
          border-r
          border-slate-200
          flex
          flex-col
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}

        <div className="flex items-center justify-between px-6 py-6">

          <div className="flex items-center gap-3">

            <div className="h-11 w-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">

              <Building2 size={22} />

            </div>

            <div>

              <h2 className="font-bold text-slate-800">
                ERP CRM
              </h2>

              <p className="text-xs text-slate-500">
                Business Suite
              </p>

            </div>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>

        </div>

        {/* Menu */}

        <div className="px-4">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Overview
          </p>

          <nav className="space-y-2">

            {menuItems
              .filter((item) => item.roles.includes(role))
              .map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "text-slate-600 hover:bg-slate-100"
                      }`
                    }
                  >
                    <Icon size={20} />

                    {item.name}
                  </NavLink>
                );
              })}
          </nav>

        </div>

        {/* Spacer */}

        <div className="flex-1" />

        {/* User */}

        <div className="border-t border-slate-200 p-5">

          <div className="mb-4 rounded-2xl bg-slate-50 p-4">

            <h3 className="font-semibold text-slate-800">
              {user.name || "User"}
            </h3>

            <p className="text-sm text-slate-500">
              {role || "Employee"}
            </p>

          </div>

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;