import { useEffect, useState } from "react";
import axios from "axios"; 
import { baseUrl } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Home =()=> {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [summaryProducts, setSummaryProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
        try{
            const {data} = await axios.get(`${baseUrl}/customers/`);
            setCustomers(data);
        }catch(e){
            console.log(e);
        }
    }
    fetchCustomerData();
  },[]);
  
  useEffect(() => {
    const fetchProductData = async () => {
        try{
            const {data} = await axios.get(`${baseUrl}/products/`); 
            setProducts(data);
        }catch(e){
            console.log(e);
        }
    }
    fetchProductData();
  },[]);

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: parseInt(value) || 1,
    });
  };

  const addToSummary = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > 0) {
      setSummaryProducts([
        ...summaryProducts,
        { ...product, quantity: quantity, total: product.price * quantity },
      ]);
    }
  };

  // ✅ Create invoice API call
  const handleCreateInvoice = async () => {
    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }
    if (summaryProducts.length === 0) {
      alert("Please add products to the invoice.");
      return;
    }

    const payload = {
      customer: selectedCustomer,
      items: summaryProducts.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const { data } = await axios.post(`${baseUrl}/bills/`, payload);
      alert("Invoice created successfully!");
      console.log("Created Invoice:", data);
      navigate(`/invoice/${data.id}`);
    } catch (e) {
      console.error("Error creating invoice:", e);
      alert("Failed to create invoice");
    }
  };

  return (
    <div className="min-h-screen bg-white text-violet-900 p-6">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">Invoice Builder</h1>

      {/* Customer Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Customer</label>
       <select
  value={selectedCustomer}
  onChange={(e) => setSelectedCustomer(Number(e.target.value))} // force integer
>

          <option value="">-- Choose Customer --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.mobile})
            </option>
          ))}
        </select>
        <button 
          onClick={() => navigate("/add-customer")}
          className="ml-4 bg-violet-600 text-white px-4 py-2 rounded-lg shadow hover:bg-violet-700"
        >
          + Add Customer
        </button>
      </div>
          {/* Button to list all bills */}
        <div className="mb-6">
        <button
          onClick={() => navigate("/bills")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          View All Bills
        </button>
        </div>
      {/* Product Table */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Available Products</h2>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow hover:bg-violet-700"
          >
            + Add Product
          </button>
        </div>

        <table className="w-full border border-violet-200 rounded-lg overflow-hidden">
          <thead className="bg-violet-100 text-violet-700">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-violet-200">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">₹{p.price}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    min="1"
                    value={quantities[p.id] || ""}
                    onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                    className="w-20 border border-violet-300 rounded-lg p-1 text-center focus:ring-2 focus:ring-violet-500"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => addToSummary(p)}
                    className="bg-violet-500 text-white px-3 py-1 rounded-lg hover:bg-violet-600"
                  >
                    Add to Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Summary */}
      {summaryProducts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Invoice Summary</h2>
          <table className="w-full border border-violet-200 rounded-lg overflow-hidden">
            <thead className="bg-violet-100 text-violet-700">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {summaryProducts.map((item, index) => (
                <tr key={index} className="border-t border-violet-200">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">₹{item.price}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2">₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleCreateInvoice} // ✅ call API
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Create Invoice
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
