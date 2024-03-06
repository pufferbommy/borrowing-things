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
import * as borrowingsService from "@/services/borrowingsService";
import { removeBorrowing } from "@/stores/borrowings";
import { toast } from "sonner";

const DeleteBorrowingAlertDialog = ({ id }: { id: number }) => {
  const handleActionClick = async () => {
    const response = await borrowingsService.deleteBorrowing(id);
    if (response.status === 200) {
      removeBorrowing(id);
      toast.success(response.data.message);
    }
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
