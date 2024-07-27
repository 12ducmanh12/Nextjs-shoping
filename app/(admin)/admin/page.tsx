"use client";
import CreateProduct from "./components/CreateProduct";
import ListProduct from "./components/ListProduct";
import Sidenav from "./components/Sidenav/Sidenav";
import DashBoard from "./components/Dashboard";
import { useAppSelector } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
function Admin() {
  const auth = useAppSelector((state) => state.auth);
  if (!auth.isAdmin) return <>not authorization access page</>;
  const searchParam = useSearchParams();
  const id = Number(searchParam.get("tab")) || 0;
  const component = [
    { id: 0, component: <CreateProduct /> },
    { id: 1, component: <ListProduct /> },
    { id: 2, component: <DashBoard /> },
  ];
  return (
    <div className="flex divide-x-2 flex-auto">
      <Sidenav />
      <div className="p-8 flex-1">{component[id].component}</div>
    </div>
  );
}

export default Admin;
