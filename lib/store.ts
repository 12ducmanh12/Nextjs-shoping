import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "./features/authSlice"
import ProductReducer from "./features/productSlice"
import CartReducer from "./features/CartSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {auth: AuthReducer, product: ProductReducer, cart: CartReducer},
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']