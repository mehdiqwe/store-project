import {MdDeleteOutline} from "react-icons/md"

import { shortenText } from "../helper/helper"

import styles from "./BasketCard.module.css"

function BasketCard({product, clickHandler}) {
  const {title, image, price, quantity} = product

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <div className={styles.info}>
        <p>{shortenText(title)}</p>
        <span>{price} $</span>
      </div>
      <div className={styles.actions}>
          {quantity === 1 && (
            <button onClick={() => clickHandler("DELETE", product)}><MdDeleteOutline /></button>
          )}
          {quantity > 1 && (
            <button onClick={() => clickHandler("DECREASE", product)}>-</button>
          )}
          <span>{quantity}</span>
          <button onClick={() => clickHandler("INCREASE", product)}>+</button>
      </div>
    </div>
  )
}

export default BasketCard