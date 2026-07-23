import { useEffect, useState } from "react";
import {
  createProduct,
  updateProduct,
} from "../../services/product.service";

type Product = {
  id?: string;
  name: string;
  sku: string;
  unitPrice: number;
  currentStock: number;
  minimumStock: number;
  warehouseLocation: string;
  categoryId: string;
};

type Props = {
  refresh: () => Promise<void>;
  editProduct: Product | null;
  clearEdit: () => void;
};

function ProductForm({
  refresh,
  editProduct,
  clearEdit,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Product>({
    name: "",
    sku: "",
    unitPrice: 0,
    currentStock: 0,
    minimumStock: 0,
    warehouseLocation: "",
    categoryId: "cmrwyyf0v00004pf7rkncldku",
  });

  useEffect(() => {
    if (editProduct) {
      setShowForm(true);
      setFormData({
        ...editProduct,
      });
    }
  }, [editProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "unitPrice" ||
        name === "currentStock" ||
        name === "minimumStock"
          ? Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      unitPrice: 0,
      currentStock: 0,
      minimumStock: 0,
      warehouseLocation: "",
      categoryId: "cmrwyyf0v00004pf7rkncldku",
    });

    setShowForm(false);
    clearEdit();
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (editProduct) {
        await updateProduct(editProduct.id!, formData);
        alert("Product Updated Successfully");
      } else {
        await createProduct(formData);
        alert("Product Added Successfully");
      }

      await refresh();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        + Add Product
      </button>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        {editProduct ? "Edit Product" : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          type="number"
          name="unitPrice"
          placeholder="Unit Price"
          value={formData.unitPrice}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          type="number"
          name="currentStock"
          placeholder="Current Stock"
          value={formData.currentStock}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          type="number"
          name="minimumStock"
          placeholder="Minimum Stock"
          value={formData.minimumStock}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <input
          name="warehouseLocation"
          placeholder="Warehouse Location"
          value={formData.warehouseLocation}
          onChange={handleChange}
          className="rounded border p-2"
          required
        />

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            {editProduct ? "Update Product" : "Save"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded bg-gray-500 px-5 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;