import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Overview from "./overview/overview";
import { ShoppingListProvider } from "./shoppingListProvider";
import Detail from "./detail/detail";

export default function App() {
  return (
    <BrowserRouter>
      <ShoppingListProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Layout>
      </ShoppingListProvider>
    </BrowserRouter>
  );
}
