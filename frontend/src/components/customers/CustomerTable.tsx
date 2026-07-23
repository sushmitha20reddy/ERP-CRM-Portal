import { deleteCustomer } from "../../services/customer.service";


type Customer = {
  id: string;
  customerName: string;
  businessName: string;
  mobile: string;
  email: string;
  customerType: string;
  status: string;
};

type CustomerTableProps = {
  customers: Customer[];
  refresh: () => Promise<void>;
  onEdit: (customer: Customer) => void;
  onView: (customer: Customer) => void;
};

function CustomerTable({
  customers,
  refresh,
  onEdit,
  onView,
}: CustomerTableProps) {


  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);
      await refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete customer");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">Customer</th>

            <th className="px-4 py-3 text-left">Business</th>

            <th className="px-4 py-3 text-left">Mobile</th>

            <th className="px-4 py-3 text-left">Email</th>

            <th className="px-4 py-3 text-left">Type</th>

            <th className="px-4 py-3 text-left">Status</th>

            <th className="px-4 py-3 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-8 text-center text-gray-500"
              >
                No Customers Found
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {customer.customerName}
                </td>

                <td className="px-4 py-3">
                  {customer.businessName}
                </td>

                <td className="px-4 py-3">
                  {customer.mobile}
                </td>

                <td className="px-4 py-3">
                  {customer.email}
                </td>

                <td className="px-4 py-3">
                  {customer.customerType}
                </td>

                <td className="px-4 py-3">
                  {customer.status}
                </td>

                <td className="px-4 py-3 flex justify-center gap-2">

<button
  onClick={() => onView(customer)}
  className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
>
  View
</button>

                  <button
  onClick={() => onEdit(customer)}
  className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
>
  Edit
</button>

                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default CustomerTable;