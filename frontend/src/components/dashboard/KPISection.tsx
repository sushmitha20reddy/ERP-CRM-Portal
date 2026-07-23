import {
  Users,
  Package,
  Boxes,
  IndianRupee,
} from "lucide-react";
import StatCard from "./StatCard";

interface Props {
  dashboard: any;
}

export default function KPISection({ dashboard }: Props) {
  const cards = [
    {
      title: "Customers",
      value: dashboard.totalCustomers ?? 0,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      growth: "+12%",
    },
    {
      title: "Products",
      value: dashboard.totalProducts ?? 0,
      icon: Package,
      color: "bg-green-100 text-green-600",
      growth: "+8%",
    },
    {
      title: "Inventory",
      value: dashboard.totalInventory ?? 0,
      icon: Boxes,
      color: "bg-orange-100 text-orange-600",
      growth: "+6%",
    },
    {
      title: "Revenue",
      value: `₹${dashboard.totalSales ?? 0}`,
      icon: IndianRupee,
      color: "bg-purple-100 text-purple-600",
      growth: "+18%",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}