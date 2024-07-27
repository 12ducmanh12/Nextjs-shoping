"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  clearCart,
  decreaseCart,
  getTotals,
  increaseCart,
  removeFromCart,
} from "@/lib/features/CartSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

function Cart() {
  const cart = useAppSelector((state: any) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  function handleRemoveFromCart(cartItem: any) {
    dispatch(removeFromCart(cartItem));
  }
  function handleDecreaseCart(cartItem: any) {
    dispatch(decreaseCart(cartItem));
  }
  function handleIncreaseCart(cartItem: any) {
    dispatch(increaseCart(cartItem));
  }
  function handleClearCart() {
    dispatch(clearCart(null));
  }
  useEffect(() => {
    dispatch(getTotals(null));
  }, [cart, dispatch]);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-5/12">PRODUCT</TableHead>
          <TableHead className="w-3/12">PRICE</TableHead>
          <TableHead className="w-2/12">QUANTITY</TableHead>
          <TableHead className="text-right w-2/12">TOTAL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((item: any) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium flex">
              <img
                src={item.image.url}
                className="w-3/12 h-3/12"
                alt={item.name}
              />
              <div className="ml-3">
                <p className="text-xl mt-4">{item.name}</p>
                <p className="mt-1">{item.desc}</p>
                <button
                  className="w-fit mt-3 hover:text-red-500 hover:font-semibold"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell>
              <div className="border border-gray-400 rounded-lg w-fit h-fit flex flex-row items-center">
                <button
                  className="px-5 py-3 hover:bg-slate-100 rounded-lg"
                  onClick={() => handleDecreaseCart(item)}
                >
                  -
                </button>
                <p className="px-4">{item.cartQuantity}</p>
                <button
                  className="px-5 py-3 hover:bg-slate-100 rounded-lg"
                  onClick={() => handleIncreaseCart(item)}
                >
                  +
                </button>
              </div>
            </TableCell>
            <TableCell className="text-right">
              ${item.price * item.cartQuantity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default Cart;
