import DashboardHeader from "../../components/dashboard/DashboardHeader";
import KPISection from "../../components/dashboard/KPISection";
import SalesChart from "../../components/dashboard/SalesChart";
import RecentChallans from "../../components/dashboard/RecentChallans";
import StatisticsPanel from "../../components/dashboard/StatisticsPanel";
import LowStockCard from "../../components/dashboard/LowStockCard";

import { useEffect, useState } from "react";

import { getDashboardSummary } from "../../services/dashboard.service";
export default function Dashboard() {
const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const data = await getDashboardSummary();
    console.log(data); // Temporary
    setDashboard(data);
  } catch (err) {
    console.error(err);
  }
};

if (!dashboard) {
  return <div className="p-10">Loading...</div>;
}

  return (
    <div className="grid grid-cols-[1fr_320px] gap-6">

      {/* LEFT SECTION */}

      <div className="space-y-6">

  <DashboardHeader />

  <KPISection dashboard={dashboard} />

  <div className="grid grid-cols-[2fr_1fr] gap-6">

    <SalesChart />

    <RecentChallans
      challans={dashboard.recentChallans || []}
    />

  </div>

  <LowStockCard
    products={dashboard.lowStockProducts || []}
  />

</div>

<StatisticsPanel dashboard={dashboard} />

      </div>

    
  );
}