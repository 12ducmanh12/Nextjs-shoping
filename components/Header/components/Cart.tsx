"use client";
import Link from "next/link";
import React from "react";
import cartIcon from "../asset/cart.svg";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

function CartItems() {
  let cart = useAppSelector((state) => state.cart);
  return (

      <Link href="/cart" className="relative mr-6">
        <Image src={cartIcon} alt="cart icon"/>
        <Badge
          variant="destructive"
          className="absolute top-0 -right-7 text-white"
        >
          {cart.cartItems.length}
        </Badge>
      </Link>
  );
}

export default CartItems;
