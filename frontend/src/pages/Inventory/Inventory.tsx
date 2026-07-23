import { useEffect, useState } from "react";
import { getStockMovements } from "../../services/stock.service";
import StockTable from "../../components/stock/StockTable";
import StockForm from "../../components/stock/StockForm";

function Stock() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStocks = async () => {
    try {
      const data = await getStockMovements();
      setStocks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Stock...</div>;
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Inventory
          </h1>

          <p className="text-gray-500">
            Stock Movements
          </p>
        </div>

        <StockForm refresh={fetchStocks} />

      </div>

      <StockTable
        stocks={stocks}
        refresh={fetchStocks}
      />

    </div>
  );
}

export default Stock;