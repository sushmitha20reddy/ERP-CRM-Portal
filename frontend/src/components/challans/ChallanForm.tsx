import { useEffect, useState } from "react";
import { createChallan } from "../../services/challan.service";
import { getCustomers } from "../../services/customer.service";
import { getProducts } from "../../services/product.service";

type Props = {
  refresh: () => Promise<void>;
};

function ChallanForm({ refresh }: Props) {
  const [showForm, setShowForm] = useState(false);

  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    customerId: "",
    status: "DRAFT" as "DRAFT" | "CONFIRMED",
    items: [
      {
        productId: "",
        quantity: 1,
      },
    ],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {
    const customerResponse = await getCustomers();
const productResponse = await getProducts();

const customers = customerResponse.customers;
const products = productResponse.data.products;

setCustomers(customers);
setProducts(products);

setFormData({
  customerId: customers[0]?.id || "",
  status: "DRAFT",
  items: [
    {
      productId: products[0]?.id || "",
      quantity: 1,
    },
  ],
});
  } catch (error) {
    console.error(error);
  }
};

  const submitChallan = async (
    status: "DRAFT" | "CONFIRMED"
  ) => {
    try {
      await createChallan({
        ...formData,
        status,
      });

      alert(
        status === "DRAFT"
          ? "Draft Saved Successfully"
          : "Challan Confirmed Successfully"
      );

      await refresh();

      setShowForm(false);

      setFormData({
        customerId: customers[0]?.id || "",
        status: "DRAFT",
        items: [
          {
            productId: products[0]?.id || "",
            quantity: 1,
          },
        ],
      });
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to Create Challan"
      );
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        + Create Challan
      </button>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        Create Challan
      </h2>

      <div className="grid gap-4">

        <select
          className="rounded border p-2"
          value={formData.customerId}
          onChange={(e) =>
            setFormData({
              ...formData,
              customerId: e.target.value,
            })
          }
        >
          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.customerName}
            </option>
          ))}
        </select>

        <select
          className="rounded border p-2"
          value={formData.items[0].productId}
          onChange={(e) =>
            setFormData({
              ...formData,
              items: [
                {
                  ...formData.items[0],
                  productId: e.target.value,
                },
              ],
            })
          }
        >
          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          className="rounded border p-2"
          value={formData.items[0].quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              items: [
                {
                  ...formData.items[0],
                  quantity: Number(e.target.value),
                },
              ],
            })
          }
        />

        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => submitChallan("DRAFT")}
            className="rounded bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => submitChallan("CONFIRMED")}
            className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Confirm
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="rounded bg-gray-500 px-5 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}

export default ChallanForm;