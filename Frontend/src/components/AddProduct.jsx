import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const saveProduct = async e => {
        e.preventDefault();
        const data = {
            name: name,
            price: price
        }
        try{
            await axios.post(`${baseUrl}/products/`, data);
            alert("Product added successfully");
            navigate("/");
        }
        catch(e){
            console.log(e);
            alert("Error adding customer");
        }

    }
    return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold text-violet-700 mb-4">Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
            value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full mb-3 border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-500"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={saveProduct}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
