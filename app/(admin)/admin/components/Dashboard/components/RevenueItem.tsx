import { DollarSign } from "lucide-react";
import React from "react";

function RevenueItem({ title, number, percent }: any) {
  return (
    <div className="flex flex-col p-6 box shadow-md rounded-md flex-1 border">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <DollarSign />
      </div>
      <p className="text-3xl font-bold">${number}</p>
      <p>{percent}</p>
    </div>
  );
}

export default RevenueItem;
