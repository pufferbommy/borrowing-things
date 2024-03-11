export interface Borrowing {
  id: number;
  status: string;
  borrower_name: string;
  device: string;
  serial_number: string;
  quantity: number;
  borrow_date: string;
  return_date: string;
  department: string;
}
