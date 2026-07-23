import { useEffect, useState } from "react";
import { getChallans } from "../../services/challan.service";
import ChallanTable from "../../components/challans/ChallanTable";
import ChallanForm from "../../components/challans/ChallanForm";

function Challans() {
  const [challans, setChallans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallans = async () => {
    try {
      const data = await getChallans();
      setChallans(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallans();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Challans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">Challans</h1>
          <p className="text-gray-500">
            Manage Delivery Challans
          </p>
        </div>

        <ChallanForm refresh={fetchChallans} />

      </div>

      <ChallanTable
        challans={challans}
        refresh={fetchChallans}
      />
    </div>
  );
}

export default Challans;