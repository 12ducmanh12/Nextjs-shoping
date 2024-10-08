"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { LoadUser } from "@/lib/features/authSlice";
import { productsFetch } from "@/lib/features/productSlice";
import { getTotals } from "@/lib/features/CartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(LoadUser());
    storeRef.current.dispatch(productsFetch());
    storeRef.current.dispatch(getTotals(null));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
