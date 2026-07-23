type Props = {
  challans: any[];
};

function RecentChallans({ challans }: Props) {
  const badge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Recent Challans
      </h2>

      {challans.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center text-slate-500">
          No Challans Found
        </div>

      ) : (

        <div className="space-y-4">

          {challans.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:shadow-md"
            >

              <div>

                <p className="font-semibold text-slate-800">
                  {item.challanNumber}
                </p>

                <p className="text-sm text-slate-500">
                  {item.customer.customerName}
                </p>

              </div>

              <div className="text-right">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

                <p className="mt-2 font-bold text-blue-600">
                  ₹{Number(item.totalAmount).toLocaleString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentChallans;