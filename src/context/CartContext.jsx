import { useEffect } from "react"
import { createContext, useReducer, useContext } from "react"
import { sumProducts } from "../helper/helper"

const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    totalPrice: 0,
    checkout: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            if(!state.selectedItems.find(item => item.id === action.payload.id)) {
                state.selectedItems.push({...action.payload, quantity: 1})
            }
            return {
                ...state,
                ...sumProducts(state.selectedItems),
                checkout: false,
            }
        case "DELETE":
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumProducts(newSelectedItems)
            }
        case "INCREASE":
            const increaseIndex = state.selectedItems.findIndex(item => item.id === action.payload.id)
                state.selectedItems[increaseIndex].quantity++
            return {
                ...state,
                ...sumProducts(state.selectedItems)
            }
        case "DECREASE":
            const decreaseIndex = state.selectedItems.findIndex(item => item.id === action.payload.id)
                state.selectedItems[decreaseIndex].quantity--
            return {
                ...state,
                ...sumProducts(state.selectedItems)
            }
        case "CHECKOUT":
            return {
                selectedItems: [],
                itemsCounter: 0,
                totalPrice: 0,
                checkout: true,
            }
        default:
            throw new Error("Invalid Action!");
    }
}

const CartContext = createContext()

function CartProvider({children}) {
    const restoredData = JSON.parse(localStorage.getItem("products"))
    const [state, dispatch] = useReducer(reducer, restoredData || initialState)

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(state))
    }, [state])
    
  return (
    <CartContext.Provider value={{state, dispatch}}>
        {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
    const {state, dispatch} = useContext(CartContext)
    return [state, dispatch]
}

export default CartProvider
export {useCart}