import { ArrowRight, CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white">

      {/* Background Decoration */}
      <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10" />
      <div className="absolute right-20 bottom-0 h-40 w-40 rounded-full bg-white/5" />

      <div className="relative flex items-center justify-between">

        {/* Left */}

        <div>

          <div className="mb-4 flex items-center gap-2 text-white/80">

            <CalendarDays size={18} />

            <span>{today}</span>

          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Welcome Back 👋
          </h1>

          <p className="mt-3 max-w-xl text-lg text-white/90">
            Manage customers, products, inventory and challans
            from one powerful dashboard.
          </p>

          <button className="mt-8 rounded-2xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105">

            Explore Dashboard

          </button>

        </div>

        {/* Right */}

        <div className="hidden lg:flex">

          <div className="rounded-full bg-white/10 p-10 backdrop-blur">

            <ArrowRight size={80} />

          </div>

        </div>

      </div>

    </div>
  );
}