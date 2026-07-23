import { useEffect, useState } from "react";
import { getFollowUps, addFollowUp } from "../../services/followup.service";

type Props = {
  customer: any;
  onClose: () => void;
};

function CustomerDetailsModal({
  customer,
  onClose,
}: Props) {
  const [followUps, setFollowUps] = useState<any[]>([]);

  const [followUpData, setFollowUpData] = useState({
    followUpDate: "",
    notes: "",
  });

  useEffect(() => {
    if (customer?.id) {
      loadFollowUps();
    }
  }, [customer]);

  const loadFollowUps = async () => {
    try {
      const data = await getFollowUps(customer.id);
      setFollowUps(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFollowUp = async () => {
    if (!followUpData.followUpDate || !followUpData.notes.trim()) {
      alert("Please enter follow-up date and notes.");
      return;
    }

    try {
      await addFollowUp(customer.id, {
        followUpDate: followUpData.followUpDate,
        notes: followUpData.notes,
      });

      setFollowUpData({
        followUpDate: "",
        notes: "",
      });

      await loadFollowUps();

      alert("Follow-up Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add follow-up");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-[750px] max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Customer Details
          </h2>

          <button
            onClick={onClose}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Close
          </button>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-gray-500">Customer Name</p>
            <p className="font-semibold">{customer.customerName}</p>
          </div>

          <div>
            <p className="text-gray-500">Business Name</p>
            <p>{customer.businessName}</p>
          </div>

          <div>
            <p className="text-gray-500">Mobile</p>
            <p>{customer.mobile}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p>{customer.email || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">GST Number</p>
            <p>{customer.gstNumber || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Customer Type</p>
            <p>{customer.customerType}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p>{customer.status}</p>
          </div>

          <div>
            <p className="text-gray-500">Address</p>
            <p>{customer.address || "-"}</p>
          </div>

        </div>

        <hr className="my-6" />

        <h3 className="mb-4 text-xl font-semibold">
          Follow-up Notes
        </h3>
                {followUps.length === 0 ? (
          <div className="rounded bg-gray-100 p-4 text-gray-500">
            No Follow-up Notes Yet
          </div>
        ) : (
          <div className="space-y-3">
            {followUps.map((item: any) => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-300 bg-gray-50 p-4"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-blue-700">
                    {new Date(item.followUpDate).toLocaleDateString()}
                  </p>

                  {item.createdBy && (
                    <span className="text-sm text-gray-500">
                      By {item.createdBy.name}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-gray-700">
                  {item.notes}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-lg border bg-gray-50 p-5">

          <h3 className="mb-4 text-lg font-semibold">
            Add Follow-up
          </h3>

          <div className="space-y-4">

            <div>
              <label className="mb-1 block font-medium">
                Follow-up Date
              </label>

              <input
                type="date"
                value={followUpData.followUpDate}
                onChange={(e) =>
                  setFollowUpData({
                    ...followUpData,
                    followUpDate: e.target.value,
                  })
                }
                className="w-full rounded border border-gray-300 p-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Notes
              </label>

              <textarea
                rows={4}
                placeholder="Enter follow-up notes..."
                value={followUpData.notes}
                onChange={(e) =>
                  setFollowUpData({
                    ...followUpData,
                    notes: e.target.value,
                  })
                }
                className="w-full rounded border border-gray-300 p-2 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">

              <button
                onClick={handleAddFollowUp}
                className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              >
                Add Follow-up
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerDetailsModal;