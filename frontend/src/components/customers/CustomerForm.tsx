import { useEffect, useState } from "react";import {
  createCustomer,
  updateCustomer,
} from "../../services/customer.service";

type Props = {
  refresh: () => Promise<void>;
  selectedCustomer: any;
  clearSelection: () => void;
};

function CustomerForm({
  refresh,
  selectedCustomer,
  clearSelection,
}: Props) {
      const [formData, setFormData] = useState({
    customerName: "",
    businessName: "",
    mobile: "",
    email: "",
    gstNumber: "",
    customerType: "WHOLESALE",
    address: "",
    status: "LEAD",
  });

  const [showForm, setShowForm] = useState(false);

useEffect(() => {
  if (selectedCustomer) {
    setFormData({
      customerName: selectedCustomer.customerName,
      businessName: selectedCustomer.businessName,
      mobile: selectedCustomer.mobile,
      email: selectedCustomer.email,
      gstNumber: selectedCustomer.gstNumber || "",
      customerType: selectedCustomer.customerType,
      address: selectedCustomer.address || "",
      status: selectedCustomer.status,
    });

    setShowForm(true);
  }
}, [selectedCustomer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

   try {
  if (selectedCustomer) {
    await updateCustomer(selectedCustomer.id, formData);
    alert("Customer Updated Successfully");
    clearSelection();
  } else {
    await createCustomer(formData);
    alert("Customer Added Successfully");
  }

  setShowForm(false);

  setFormData({
    customerName: "",
    businessName: "",
    mobile: "",
    email: "",
    gstNumber: "",
    customerType: "WHOLESALE",
    address: "",
    status: "LEAD",
  });

  await refresh();
}
    catch (error) {
      console.error(error);
      alert("Failed to Add Customer");
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        + Add Customer
      </button>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">
  {selectedCustomer ? "Edit Customer" : "Add Customer"}
</h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        <input
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="rounded border p-2"
        />

        <input
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
          className="rounded border p-2"
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="rounded border p-2"
        />

        <select
          name="customerType"
          value={formData.customerType}
          onChange={handleChange}
          className="rounded border p-2"
        >
          <option>WHOLESALE</option>
          <option>RETAIL</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded border p-2"
        >
          <option>LEAD</option>
          <option>ACTIVE</option>
          <option>INACTIVE</option>
        </select>

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="rounded bg-green-600 px-5 py-2 text-white"
          >
            {selectedCustomer ? "Update" : "Save"}
          </button>

          <button
            type="button"
            onClick={() => {
  setShowForm(false);
  clearSelection();
}}
            className="rounded bg-gray-500 px-5 py-2 text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;