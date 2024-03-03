"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import axios from "axios";

const DeleteBorrowingAlertDialog = ({ id }: { id: number }) => {
  const handleActionClick = async () => {
    await axios.delete(`api/borrowings?id=${id}`);
    location.reload();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <TrashIcon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณต้องการลบการยืม-คืนอุปกรณ์นี้?</AlertDialogTitle>
          <AlertDialogDescription>
            การลบการยืม-คืนอุปกรณ์นี้จะไม่สามารถกู้คืนได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={handleActionClick}>
            ยืนยัน
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBorrowingAlertDialog;
