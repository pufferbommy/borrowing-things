import { Borrowing } from "@/interfaces/borrowing";
import { atom } from "nanostores";

export const $borrowings = atom<Borrowing[]>([]);

export const setBorrowings = (borrowings: Borrowing[]) => {
  $borrowings.set(borrowings);
};

export const removeBorrowing = (id: number) => {
  $borrowings.set($borrowings.get().filter((b) => b.id !== id));
};

export const updateBorrowing = (borrowing: Borrowing) => {
  $borrowings.set(
    $borrowings.get().map((b) => (b.id === borrowing.id ? borrowing : b))
  );
};
