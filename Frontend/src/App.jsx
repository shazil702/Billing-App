import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddCustomer from "./components/AddCoustomer"
import Home from "./components/Home"
import AddProduct from "./components/AddProduct"
import InvoiceDetail from "./components/InvoiceDetail"
import BillsList from "./components/BillsList"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add-customer" element={<AddCustomer/>}/>
      <Route path="/add-product" element={<AddProduct/>}/>
      <Route path="/invoice/:id" element={<InvoiceDetail/>}/>
      <Route path="/bills" element={<BillsList/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
