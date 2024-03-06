import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import BorrowDialog from "@/components/dialogs/borrow-dialog";
import { Borrowing } from "@/interfaces/borrowing";

interface BorrowingsTableProps {
  borrowings: Borrowing[];
}

const BorrowingsTable = ({ borrowings = [] }: BorrowingsTableProps) => {
  return (
    <div>
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-bold">
          การยืม-คืนอุปกรณ์ ({borrowings.length})
        </h1>
        <BorrowDialog />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={borrowings} />
      </div>
    </div>
  );
};

export default BorrowingsTable;
