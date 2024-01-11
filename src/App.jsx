import {Routes, Route, Navigate} from "react-router-dom"

import ProductsPage from "./Pages/ProductsPage"
import DetailsPage from "./Pages/DetailsPage"
import CheckOutPage from "./Pages/CheckOutPage"
import PageNotFound from "./Pages/404Page"
import Layout from "./Layouts/Layout"

import ProductsProvider from "./context/ProductContext"
import CartProvider from "./context/CartContext"

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Layout>
          <Routes>
            <Route index element={<Navigate to={"/products"} replace/>}/>
            <Route path="/products" element={<ProductsPage />}/>
            <Route path="/products/:id" element={<DetailsPage />}/>
            <Route path="/checkout" element={<CheckOutPage />}/>
            <Route path="/*" element={<PageNotFound />}/>
          </Routes>
        </Layout>
      </ProductsProvider>
    </CartProvider>
  )
}

export default App
