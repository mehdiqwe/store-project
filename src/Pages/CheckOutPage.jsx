import BasketCard from "../Components/BasketCard"
import BasketSidebar from "../Components/BasketSidebar"

import {useCart} from "../context/CartContext"

import styles from "./CheckOutPage.module.css"

function CheckOutPage() {
  const [state, dispatch] = useCart()

  const clickHandler = (type, payload) => {
    dispatch({type, payload})
  }

  if(!state.itemsCounter) {
    return (
      <div>
        <p style={{textAlign: "center", marginRight: "10px"}}>No Order Yet</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <BasketSidebar state={state} dispatch={dispatch}/>
      <div className={styles.products}>
        {state.selectedItems.map(product => <BasketCard key={product.id} product={product} clickHandler={clickHandler}/>)}
      </div>
    </div>
  )
}

export default CheckOutPage