"use client";
import BorrowingsTable from "@/components/tables/borrowings-table";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get("api/borrowings");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return <BorrowingsTable data={data} />;
};

export default Home;
