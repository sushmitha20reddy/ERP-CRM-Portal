import { TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  growth: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  growth,
}: Props) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          <Icon size={28} />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
          <TrendingUp size={16} />
          {growth}
        </div>

      </div>

      <div className="mt-8">

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-4xl font-bold text-slate-800">
          {value}
        </h2>

      </div>

    </div>
  );
}