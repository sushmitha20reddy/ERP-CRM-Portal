import { useEffect, useState } from "react";
import ProductTable from "../../components/products/ProductTable";
import ProductForm from "../../components/products/ProductForm";
import { getProducts } from "../../services/product.service";

function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editProduct, setEditProduct] = useState<any | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage Products
          </p>
        </div>

        <ProductForm
          refresh={fetchProducts}
          editProduct={editProduct}
          clearEdit={() => setEditProduct(null)}
        />

      </div>

      <ProductTable
        products={products}
        refresh={fetchProducts}
        onEdit={setEditProduct}
      />

    </div>
  );
}

export default Products;