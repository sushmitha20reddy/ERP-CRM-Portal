import { TrendingUp } from "lucide-react";

function SalesChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Sales Overview
          </h2>

          <p className="mt-2 text-slate-500">
            Monthly Business Analytics
          </p>
        </div>

        <div className="rounded-2xl bg-blue-100 p-4">
          <TrendingUp className="h-8 w-8 text-blue-600" />
        </div>

      </div>

      {/* Fake Chart */}
      <div className="relative h-80">

        {/* Grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[1,2,3,4,5].map((i)=>(
            <div
              key={i}
              className="border-t border-dashed border-slate-200"
            />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full px-6">

          <div className="flex flex-col items-center">
            <div className="w-10 h-24 rounded-t-xl bg-indigo-300"></div>
            <span className="mt-3 text-sm text-slate-500">Jan</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-36 rounded-t-xl bg-indigo-400"></div>
            <span className="mt-3 text-sm text-slate-500">Feb</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-52 rounded-t-xl bg-indigo-500"></div>
            <span className="mt-3 text-sm text-slate-500">Mar</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-40 rounded-t-xl bg-indigo-400"></div>
            <span className="mt-3 text-sm text-slate-500">Apr</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-64 rounded-t-xl bg-indigo-600"></div>
            <span className="mt-3 text-sm text-slate-500">May</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-56 rounded-t-xl bg-indigo-500"></div>
            <span className="mt-3 text-sm text-slate-500">Jun</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default SalesChart;