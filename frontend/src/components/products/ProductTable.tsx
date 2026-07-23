import {
  deleteProduct,
} from "../../services/product.service";

type Product = {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
  currentStock: number;
  minimumStock: number;
  warehouseLocation: string;
  categoryId: string;
  category: {
    name: string;
  };
};

type Props = {
  products: Product[];
  refresh: () => Promise<void>;
  onEdit: (product: Product) => void;
};

function ProductTable({
  products,
  refresh,
  onEdit,
}: Props) {

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      await refresh();
      alert("Product Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Delete Product");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Min Stock</th>
            <th className="px-4 py-3 text-left">Warehouse</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-8 text-center text-gray-500"
              >
                No Products Found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">{product.name}</td>

                <td className="px-4 py-3">{product.sku}</td>

                <td className="px-4 py-3">
                  {product.category?.name}
                </td>

                <td className="px-4 py-3">
                  ₹{product.unitPrice}
                </td>

                <td className="px-4 py-3">
                  {product.currentStock}
                </td>

                <td className="px-4 py-3">
                  {product.minimumStock}
                </td>

                <td className="px-4 py-3">
                  {product.warehouseLocation}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(product)}
                      className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;