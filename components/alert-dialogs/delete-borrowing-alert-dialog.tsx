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
import { useState } from "react";

const DeleteBorrowingAlertDialog = ({ id }: { id: number }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleActionClick = async () => {
    setIsDeleting(true);
    const response = await borrowingsService.deleteBorrowing(id);
    if (response.status === 200) {
      removeBorrowing(id);
      toast.success(response.data.message);
    }
    setIsDeleting(false);
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
          <AlertDialogCancel disabled={isDeleting}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={handleActionClick}>
            {isDeleting ? "กำลังลบ..." : "ลบ"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBorrowingAlertDialog;
