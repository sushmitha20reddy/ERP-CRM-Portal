type StockMovement = {
  id: string;
  quantity: number;
  movementType: "IN" | "OUT";
  reason: string;
  createdAt: string;
  product: {
    name: string;
    sku: string;
  };
  createdBy: {
    name: string;
    email: string;
  };
};

type Props = {
  stocks: StockMovement[];
  refresh: () => Promise<void>;
};

function StockTable({ stocks, refresh }: Props) {
  void refresh;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Movement</th>
            <th className="px-4 py-3 text-left">Reason</th>
            <th className="px-4 py-3 text-left">Created By</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>

          {stocks.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-8 text-center text-gray-500"
              >
                No Stock Movements Found
              </td>
            </tr>
          ) : (
            stocks.map((stock) => (
              <tr
                key={stock.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {stock.product.name}
                </td>

                <td className="px-4 py-3">
                  {stock.product.sku}
                </td>

                <td className="px-4 py-3">
                  {stock.quantity}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-1 text-white ${
                      stock.movementType === "IN"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {stock.movementType}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {stock.reason}
                </td>

                <td className="px-4 py-3">
                  {stock.createdBy.name}
                </td>

                <td className="px-4 py-3">
                  {new Date(stock.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default StockTable;