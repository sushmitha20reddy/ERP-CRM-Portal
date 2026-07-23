import { useEffect, useState } from "react";
import { createStockMovement } from "../../services/stock.service";
import { getProducts } from "../../services/product.service";

type Props = {
  refresh: () => Promise<void>;
};

function StockForm({ refresh }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    movementType: "IN",
    reason: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);

        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            productId: data[0].id,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createStockMovement(formData);

      alert("Stock Movement Added");

      await refresh();

      setShowForm(false);

      setFormData({
        productId: products[0]?.id || "",
        quantity: 1,
        movementType: "IN",
        reason: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to Add Stock Movement");
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        + Add Stock
      </button>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        Add Stock Movement
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        <select
          value={formData.productId}
          onChange={(e) =>
            setFormData({
              ...formData,
              productId: e.target.value,
            })
          }
          className="rounded border p-2"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.sku})
            </option>
          ))}
        </select>

        <select
          value={formData.movementType}
          onChange={(e) =>
            setFormData({
              ...formData,
              movementType: e.target.value,
            })
          }
          className="rounded border p-2"
        >
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>

        <input
          type="number"
          min={1}
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity: Number(e.target.value),
            })
          }
          className="rounded border p-2"
          required
        />

        <input
          type="text"
          placeholder="Reason"
          value={formData.reason}
          onChange={(e) =>
            setFormData({
              ...formData,
              reason: e.target.value,
            })
          }
          className="rounded border p-2"
          required
        />

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="rounded bg-gray-500 px-5 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StockForm;