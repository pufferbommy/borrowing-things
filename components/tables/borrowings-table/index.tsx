import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import BorrowDialog from "@/components/dialogs/borrow-dialog";

export interface Borrowing {
  id: number;
  status: string;
  borrowerName: string;
  device: string;
  serialNumber: string;
  quantity: number;
  borrowDate: string;
  returnDate: string;
  department: string;
}

interface BorrowingsTableProps {
  data: Borrowing[];
}

const BorrowingsTable = ({ data = [] }: BorrowingsTableProps) => {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">
          การยืม-คืนอุปกรณ์ ({data.length})
        </h1>
        <BorrowDialog />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default BorrowingsTable;
