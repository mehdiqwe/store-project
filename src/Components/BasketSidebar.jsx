import {TbChecklist} from "react-icons/tb"
import {FaHashtag} from "react-icons/fa"
import {BsPatchCheck} from "react-icons/bs"

import styles from "./BasketSidebar.module.css"

function BasketSidebar({state, dispatch}) {

  return (
    <div className={styles.sidebar}>
        <div>
            <TbChecklist />
            <p>Total Price:</p>
            <span>{state.totalPrice} $</span>
        </div>
        <div>
            <FaHashtag />
            <p>Quantity:</p>
            <span>{state.itemsCounter}</span>
        </div>
        <div>
            <BsPatchCheck />
            <p>Status:</p>
            <span>{!state.checkout && "pending..."}</span>
        </div>
        <button onClick={() => dispatch({type: "CHECKOUT"})}>Checkout</button>
    </div>
  )
}

export default BasketSidebar