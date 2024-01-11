import {FaListUl} from "react-icons/fa"

import { createQueryObject } from "../helper/helper"
import { categories } from "../constants/list"

import styles from "./Sidebar.module.css"

function Sidebar({query, setQuery}) {

    const categoryHandler = (e) => {
        const {tagName} = e.target
        const category = e.target.innerText.toLowerCase()
    
        if(tagName !== "LI") return
        setQuery(query => createQueryObject(query, {category}))
    }

  return (
    <div className={styles.sidebar}>
        <div>
            <FaListUl />
            <p>Categoriers</p>
        </div>
        <ul onClick={categoryHandler}>
            {categories.map(category => 
            <li key={category.id} className={category.type.toLowerCase() === query.category ? styles.selected : null}>
                {category.type}
            </li>
            )}
        </ul>
    </div>
  )
}

export default Sidebar