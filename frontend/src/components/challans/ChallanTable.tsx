import { cancelChallan } from "../../services/challan.service";

type Challan = {
  id: string;
  challanNumber: string;
  totalQuantity: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  customer: {
    customerName: string;
  };
};

type Props = {
  challans: Challan[];
  refresh: () => Promise<void>;
};

function ChallanTable({ challans, refresh }: Props) {
  const handleCancel = async (id: string) => {
    const confirmCancel = window.confirm(
      "Cancel this Challan?"
    );

    if (!confirmCancel) return;

    try {
      await cancelChallan(id);
      alert("Challan Cancelled");
      await refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to Cancel Challan");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Challan No</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>

          {challans.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-8 text-center text-gray-500"
              >
                No Challans Found
              </td>
            </tr>
          ) : (
            challans.map((challan) => (
              <tr
                key={challan.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {challan.challanNumber}
                </td>

                <td className="px-4 py-3">
                  {challan.customer.customerName}
                </td>

                <td className="px-4 py-3">
                  {challan.totalQuantity}
                </td>

                <td className="px-4 py-3">
                  ₹{challan.totalAmount}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-1 text-white ${
                      challan.status === "CANCELLED"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {challan.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {new Date(challan.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center">
                  {challan.status !== "CANCELLED" && (
                    <button
                      onClick={() => handleCancel(challan.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default ChallanTable;