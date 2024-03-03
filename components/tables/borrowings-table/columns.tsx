"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Borrowing } from ".";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DeleteBorrowingAlertDialog from "@/components/alert-dialogs/delete-borrowing-alert-dialog";
import EditBorrowDialog from "@/components/dialogs/edit-borrow-dialog";
import axios from "axios";

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
            axios.patch("api/borrowings", {
              id: row.original.id,
              status: value,
            });
            location.reload();
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
    accessorKey: "borrowerName",
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
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "quantity",
    header: "จำนวน",
  },
  {
    accessorKey: "borrowDate",
    header: "วันที่ยืม",
    cell: ({ row }) =>
      format(new Date(row.getValue("borrowDate")), "dd MMMM yyyy", {
        locale: th,
      }),
  },
  {
    accessorKey: "returnDate",
    header: "วันที่คืน",
    cell: ({ row }) =>
      format(new Date(row.getValue("returnDate")), "dd MMMM yyyy", {
        locale: th,
      }),
  },
];
