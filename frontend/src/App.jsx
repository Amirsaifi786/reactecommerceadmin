import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Media from "./pages/Media";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="media" element={<Media />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          {/* Add other sub-routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App