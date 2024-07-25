"use client";
import Items from "./component/Items";
import { useRouter, useSearchParams } from "next/navigation";
function Sidenav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ChangeTab = (id: Number) => {
    // const params = new URLSearchParams(searchParams);
    router.push(`?tab=${id}`);
  };

  const tabId = Number(searchParams.get("tab")) || 0;
  return (
    <div className="pt-4 border-r border-gray-400 w-2/12">
      <p className="text-2xl font-normal mb-5 text-center">Admin</p>
      <div
        onClick={() => {
          ChangeTab(0);
        }}
      >
        <Items active={tabId == 0}>
          <p>Create product</p>
        </Items>
      </div>
      <div
        onClick={() => {
          ChangeTab(1);
        }}
      >
        <Items active={tabId == 1}>
          <p>List product</p>
        </Items>
      </div>
      <div
        onClick={() => {
          ChangeTab(2);
        }}
      >
        <Items active={tabId == 2}>
          <p>Dashboard</p>
        </Items>
      </div>
    </div>
  );
}

export default Sidenav;
