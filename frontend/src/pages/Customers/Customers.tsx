import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customer.service";

import CustomerTable from "../../components/customers/CustomerTable";
import CustomerForm from "../../components/customers/CustomerForm";
import CustomerDetailsModal from "../../components/customers/CustomerDetailsModal";

function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [viewCustomer, setViewCustomer] = useState<any>(null);
const [showDetails, setShowDetails] = useState(false);

  const filteredCustomers = customers.filter((customer) =>
  customer.customerName.toLowerCase().includes(search.toLowerCase()) ||
  customer.businessName.toLowerCase().includes(search.toLowerCase()) ||
  customer.mobile.includes(search)
);

  const fetchCustomers = async () => {
  try {
    const response = await getCustomers();

    setCustomers(response.customers);
  } catch (error) {
    console.error("Failed to fetch customers", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Customers...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-gray-500">
            Manage your customers
          </p>
        </div>

<CustomerForm
  refresh={fetchCustomers}
  selectedCustomer={selectedCustomer}
  clearSelection={() => setSelectedCustomer(null)}
/>
      </div>

<div className="flex justify-end">
  <input
    type="text"
    placeholder="Search customers..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-80 rounded-lg border p-2"
  />
</div>

     <CustomerTable
  customers={filteredCustomers}
  refresh={fetchCustomers}
  onEdit={setSelectedCustomer}
  onView={(customer) => {
    setViewCustomer(customer);
    setShowDetails(true);
  }}
/>
{showDetails && (
  <CustomerDetailsModal
    customer={viewCustomer}
    onClose={() => setShowDetails(false)}
  />
)}

    </div>
  );
}


export default Customers;