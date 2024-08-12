import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url: any) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return [data];
};

export default useFetch;
