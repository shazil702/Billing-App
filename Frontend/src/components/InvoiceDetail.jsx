import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constants/constants";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/bills/${id}/`);
        setInvoice(data);
        console.log(data);
        
      } catch (e) {
        console.error("Error fetching invoice:", e);
      }
    };
    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return <p className="p-6 text-violet-700">Loading invoice...</p>;
  }

  return (
    <div className="min-h-screen bg-white text-violet-900 p-6">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">
        Invoice #{invoice.id}
      </h1>

      {/* Customer Info */}
      <div className="mb-6 bg-violet-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
        <p><span className="font-medium">Name:</span> {invoice?.customer_name}</p>
        <p><span className="font-medium">Mobile:</span> {invoice?.customer_mobile}</p>
        <p><span className="font-medium">Date:</span> {invoice.date}</p>
      </div>

      {/* Invoice Items */}
      <h2 className="text-xl font-semibold mb-3">Products</h2>
      <table className="w-full border border-violet-200 rounded-lg overflow-hidden mb-6">
        <thead className="bg-violet-100 text-violet-700">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} className="border-t border-violet-200">
              <td className="px-4 py-2">{item?.product_name}</td>
              <td className="px-4 py-2">₹{item?.product_price}</td>
              <td className="px-4 py-2 text-center">{item.quantity}</td>
              <td className="px-4 py-2">₹{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right">
        <p className="text-lg font-semibold">
          Total Items: {invoice.total_items}
        </p>
        <p className="text-xl font-bold text-violet-700">
          Final Amount: ₹{invoice.total_amount}
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg shadow hover:bg-violet-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;
