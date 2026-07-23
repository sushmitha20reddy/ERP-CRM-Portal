import {
  Users,
  Package,
  Boxes,
  TrendingUp,
} from "lucide-react";

interface Props {
  dashboard: any;
}

export default function StatisticsPanel({ dashboard }: Props) {
  const stats = [
    {
      title: "Customers",
      value: dashboard.totalCustomers ?? 0,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Products",
      value: dashboard.totalProducts ?? 0,
      icon: Package,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inventory",
      value: dashboard.totalInventory ?? 0,
      icon: Boxes,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="sticky top-24 space-y-6">

      {/* Business Summary */}

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

        <h2 className="text-xl font-bold text-slate-800">
          Business Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overall Performance
        </p>

        {/* Circle */}

        <div className="mt-8 flex justify-center">

          <div className="relative flex h-44 w-44 items-center justify-center rounded-full">

            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(#4f46e5 82%, #e5e7eb 0%)",
              }}
            />

            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">

              <h1 className="text-4xl font-bold text-slate-800">
                82%
              </h1>

              <p className="text-sm text-slate-500">
                Growth
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

        <h2 className="mb-5 text-lg font-semibold">
          Overview
        </h2>

        <div className="space-y-5">

          {stats.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="font-semibold text-slate-800">
                      {item.value}
                    </h3>

                  </div>

                </div>

                <TrendingUp
                  className="text-green-500"
                  size={20}
                />

              </div>
            );

          })}

        </div>

      </div>

      {/* Quick Analytics */}

      <div className="rounded-3xl bg-indigo-600 p-6 text-white">

        <p className="text-sm text-indigo-100">
          Monthly Sales
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          ₹{dashboard.totalSales ?? 0}
        </h1>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-indigo-400">

          <div className="h-full w-4/5 rounded-full bg-white" />

        </div>

        <p className="mt-3 text-sm text-indigo-100">
          80% Target Achieved
        </p>

      </div>

    </div>
  );
}