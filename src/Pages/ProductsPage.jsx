import Card from "../Components/Card"
import Loader from "../Components/Loader"
import SearchBox from "../Components/SearchBox"
import Sidebar from "../Components/Sidebar"

import { useEffect, useState } from "react"
import { useSearchParams} from "react-router-dom"
import {useProducts} from "../context/ProductContext"

import { searchProducts, filteredProducts, getInitialQuery } from "../helper/helper"

import styles from "./ProductsPage.module.css"

function ProductsPage() {
  const products = useProducts()

  const [displayed, setDisplayed] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState({})

  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
    setDisplayed(products)
    setQuery(getInitialQuery(searchParams))
  }, [products])

  useEffect(() => {
    setSearchParams(query)
    setSearch(query.search || "")
    let finalProducts = searchProducts(products, query.search)
    finalProducts = filteredProducts(finalProducts, query.category)
    setDisplayed(finalProducts)
  }, [query])

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map(product => <Card key={product.id} data={product}/>)}
        </div>
        <Sidebar query={query} setQuery={setQuery}/>
      </div>
    </>
  )
}

export default ProductsPage