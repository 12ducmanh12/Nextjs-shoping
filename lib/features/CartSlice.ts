import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
            if (itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity +=1;
                toast.info(`increased ${state.cartItems[itemIndex].name} cart quantity`, {position: "top-left"})
            }
            else{
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} added to cart`, {position: "top-left"})
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id 
            );
            state.cartItems = nextCartItems
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} removed to cart`, {position: "top-left"})
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1;
            }
            else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload._id 
                );
                state.cartItems = nextCartItems
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        increaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
                state.cartItems[itemIndex].cartQuantity += 1;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        ClearCart(state, action){
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        getTotals(state, action){
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal : any, cartItem : any) => {
                    const {price, cartQuantity} = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            state.cartTotalAmount = total;
            state.cartTotalQuantity = quantity;
        }

    }
})
export const { addToCart, removeFromCart, decreaseCart, increaseCart, ClearCart, getTotals } = CartSlice.actions;

export default CartSlice.reducer;