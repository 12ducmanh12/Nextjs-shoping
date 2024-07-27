"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { ButtonAddtoCart } from "@/components/ui/ButtonStyle";
import { addToCart } from "@/lib/features/CartSlice";
interface items {
  _id: any;
  name: string;
  image: any;
  shortDesc: string;
  price: number;
  brand: string;
}
export default function Home() {
  let { items: data } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const handleAddToCart = (items: items) => {
    dispatch(addToCart(items));
  };
  return (
    <main className="flex pt-12 gap-x-5">
      {data.length === 0 && (
        <p className="text-center text-2xl">New Arrivals</p>
      )}
      <div className="flex flex-wrap gap-x-8 gap-y-6 items-center">
        {data.map((items: items) => (
          <div
            key={items._id}
            className="bg-white shadow-xl rounded-xl w-[300px] px-3 py-4 border border-gray-100"
          >
            <Link href={`/product/${items.name}-${items._id}`}>
              <p className="text-2xl font-medium mb-2">{items?.name}</p>
              <img
                src={items.image.url}
                alt={items?.name}
                className="w-10/12 h-[300px] transition duration-150 ease-in-out"
              />
            </Link>
            <div className="flex flex-row justify-between">
              <span>{items.shortDesc}</span>
              <span className="font-semibold text-xl">${items.price}</span>
            </div>
            <button
              className={ButtonAddtoCart}
              onClick={() => handleAddToCart(items)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
