import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constants/constants";

const BillsList = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/bills/`);
        setBills(data);
        console.log(data);
        
      } catch (e) {
        console.error("Error fetching bills:", e);
      }
    };
    fetchBills();
  }, []);

  return (
    <div className="min-h-screen bg-white text-violet-900 p-6">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">All Bills</h1>

      {bills.length === 0 ? (
        <p className="text-violet-600">No bills found.</p>
      ) : (
        <table className="w-full border border-violet-200 rounded-lg overflow-hidden">
          <thead className="bg-violet-100 text-violet-700">
            <tr>
              <th className="px-4 py-2 text-left">Bill ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total Items</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-t border-violet-200">
                <td className="px-4 py-2">{bill?.id}</td>
                <td className="px-4 py-2">{bill?.customer_name}</td>
                <td className="px-4 py-2">{bill.date}</td>
                <td className="px-4 py-2 text-center">{bill.total_items}</td>
                <td className="px-4 py-2 font-medium">₹{bill.total_amount}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => navigate(`/invoice/${bill.id}`)}
                    className="bg-violet-500 text-white px-3 py-1 rounded-lg hover:bg-violet-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillsList;
