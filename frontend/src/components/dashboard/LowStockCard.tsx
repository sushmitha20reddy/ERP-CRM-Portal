import { AlertTriangle } from "lucide-react";

type Props = {
  products: any[];
};

function LowStockCard({ products }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">
            Low Stock Products
          </h2>

          <p className="text-sm text-slate-500">
            Products that require restocking
          </p>

        </div>

        <AlertTriangle className="h-7 w-7 text-orange-500" />

      </div>

      {products.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center text-slate-500">
          🎉 All products are sufficiently stocked.
        </div>

      ) : (

        <div className="space-y-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50 p-4 transition hover:shadow"
            >

              <div>

                <p className="font-semibold">
                  {product.name}
                </p>

                <p className="text-sm text-slate-500">
                  Current Stock
                </p>

              </div>

              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                {product.currentStock} Left
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default LowStockCard;