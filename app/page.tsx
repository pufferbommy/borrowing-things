"use client";
import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $borrowings, setBorrowings } from "@/stores/borrowings";
import * as borrowingsService from "@/services/borrowingsService";
import BorrowingsTable from "@/components/tables/borrowings-table";

const Home = () => {
  const borrowings = useStore($borrowings);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await borrowingsService.getBorrowings();
      setBorrowings(response.data);
    })();

    return () => abortController.abort();
  }, []);

  return <BorrowingsTable borrowings={borrowings} />;
};

export default Home;
