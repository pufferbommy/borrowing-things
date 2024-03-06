import { Borrowing } from "@/interfaces/borrowing";
import axios from "axios";

export const getBorrowings = async () => {
  const response = await axios.get<Borrowing[]>("api/borrowings");
  return response;
};

export const updateBorrowingStatus = async (id: number, status: string) => {
  const response = await axios.patch("api/borrowings", {
    id,
    status,
  });
  return response;
};

export const updateBorrowing = async (borrowing: Borrowing) => {
  const response = await axios.put("api/borrowings", borrowing);
  return response;
};

export const deleteBorrowing = async (id: number) => {
  const response = await axios.delete(`api/borrowings?id=${id}`);
  return response;
};

export const createBorrowing = async (
  borrowing: Omit<Omit<Borrowing, "id">, "status">
) => {
  const response = await axios.post("api/borrowings", borrowing);
  return response;
};
