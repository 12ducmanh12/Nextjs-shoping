import React from "react";

interface ItemsProps {
  active: boolean;
  children: React.ReactNode;
}

const Items: React.FC<ItemsProps> = ({ active, children }) => {
  return (
    <div
      className={`${
        active ? "bg-gray-300 text-red-500" : ""
      } hover:bg-gray-300 cursor-pointer py-2 pl-2 m-2 rounded-md hover:text-red-500`}
    >
      {children}
    </div>
  );
};

export default Items;
