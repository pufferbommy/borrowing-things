"use client";
import { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { th } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DeleteBorrowingAlertDialog from "@/components/alert-dialogs/delete-borrowing-alert-dialog";
import EditBorrowDialog from "@/components/dialogs/edit-borrow-dialog";
import * as borrowingsService from "@/services/borrowingsService";
import { Borrowing } from "@/interfaces/borrowing";
import { setBorrowings } from "@/stores/borrowings";
import { toast } from "sonner";

export const columns: ColumnDef<Borrowing>[] = [
  {
    accessorKey: "no",
    header: "ลำดับ",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <EditBorrowDialog data={row.original} />
          <DeleteBorrowingAlertDialog id={row.original.id} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Select
          value={status}
          onValueChange={(value) => {
            borrowingsService
              .updateBorrowingStatus(row.original.id, value)
              .then((response) => {
                if (response.status === 200) {
                  (async () => {
                    const response = await borrowingsService.getBorrowings();
                    setBorrowings(response.data);
                  })();
                  toast.success(response.data.message);
                }
              });
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ยังไม่คืน">ยังไม่คืน</SelectItem>
            <SelectItem value="คืนแล้ว">คืนแล้ว</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "borrower_name",
    header: "ชื่อผู้ยืม",
  },
  {
    accessorKey: "department",
    header: "แผนก",
  },
  {
    accessorKey: "device",
    header: "อุปกรณ์",
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number",
  },
  {
    accessorKey: "quantity",
    header: "จำนวน",
  },
  {
    accessorKey: "borrow_date",
    header: "วันที่ยืม",
    cell: ({ row }) =>
      format(new Date(row.getValue("borrow_date")), "dd MMMM yyyy", {
        locale: th,
      }),
  },
  {
    accessorKey: "return_date",
    header: "วันที่คืน",
    cell: ({ row }) =>
      format(new Date(row.getValue("return_date")), "dd MMMM yyyy", {
        locale: th,
      }),
  },
];
