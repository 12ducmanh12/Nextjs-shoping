import { url } from "@/lib/features/api";
import RevenueItem from "./components/RevenueItem";
import useFetch from "@/hook/useFetch";
import ColumnChart from "./components/ColumnChart";
import PieChartComponent from "./components/PieChart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
function DashBoard() {
  const [numberUser] = useFetch(`${url}/overview/number_user`);
  const [numberProductSell] = useFetch(`${url}/overview/number_order`);
  const [revenue] = useFetch(`${url}/overview/revenue`);

  const listRevenue = [
    {
      title: "Number user",
      number: numberUser,
      percent: "increse 23% last month",
    },
    {
      title: "Number product sell",
      number: numberProductSell,
      percent: "increse 23% last month",
    },
    {
      title: "Revenue",
      number: revenue,
      percent: "increse 23% last month",
    },
  ];

  type RevenueByBrandItem = {
    [key: string]: string; // Adjust the value type according to your actual data structure
  };
  const [tabId, setTabId] = useState(0);
  const [dataRaw, setData] = useState<RevenueByBrandItem[] | null>(null);
  useEffect(() => {
    axios
      .get(`${url}/dashboard/revenue-by-brand`)
      .then((res) => setData(res.data));
  }, []);
  const data = dataRaw?.map((item: RevenueByBrandItem) => {
    return {
      type: item.brand,
      value: item.totalRevenue,
    };
  });
  const chartComponent = [
    {
      id: 0,
      component: <ColumnChart data={data} />,
    },
    {
      id: 1,
      component: <PieChartComponent data={data} />,
    },
  ];
  return (
    <div>
      <div className="flex gap-x-4 flex-1">
        {listRevenue.map((item, index) => (
          <RevenueItem
            key={index}
            title={item.title}
            number={item.number}
            percent={item.percent}
          />
        ))}
      </div>
      <div className="flex flex-col mt-4 gap-y-4">
        <Select onValueChange={(value) => setTabId(parseInt(value, 10))}>
          <SelectTrigger className="w-[180px] ml-auto">
            <SelectValue placeholder="Bar Chart" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Bar Chart</SelectItem>
            <SelectItem value="1">Pie Chart</SelectItem>
          </SelectContent>
        </Select>
        {chartComponent[tabId].component}
      </div>
    </div>
  );
}

export default DashBoard;
