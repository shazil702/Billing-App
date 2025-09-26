import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    const saveCoustomer = async e => {
        e.preventDefault();
        const data = {
            name: name,
            mobile: mobile
        }
        try{
            await axios.post(`${baseUrl}/customers/`, data);
            alert("Customer added successfully");
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
        <h2 className="text-xl font-bold text-violet-700 mb-4">Add Customer</h2>

        <input
          type="text"
          placeholder="Customer Name"
            value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
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
            onClick={saveCoustomer}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
