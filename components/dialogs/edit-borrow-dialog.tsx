"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PenIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { th } from "date-fns/locale";
import { toast } from "sonner";
import { Borrowing } from "@/interfaces/borrowing";
import { updateBorrowing } from "@/stores/borrowings";
import * as borrowingsService from "@/services/borrowingsService";

const EditBorrowDialog = ({ data }: { data: Borrowing }) => {
  const [borrowerName, setBorrowerName] = useState<string>(data.borrowerName);
  const [department, setDepartment] = useState<string>(data.department);
  const [device, setDevice] = useState<string>(data.device);
  const [serialNumber, setSerialNumber] = useState<string>(data.serialNumber);
  const [quantity, setQuantity] = useState<number>(data.quantity);
  const [borrowDate, setBorrowDate] = useState<Date | undefined>(
    new Date(data.borrowDate)
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(data.returnDate)
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleCancelClick = () => {
    setBorrowerName(data.borrowerName);
    setDepartment(data.department);
    setDevice(data.device);
    setSerialNumber(data.serialNumber);
    setQuantity(data.quantity);
    setBorrowDate(new Date(data.borrowDate));
    setReturnDate(new Date(data.returnDate));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!borrowDate) {
      return toast.error("กรุณาเลือกวันที่ยืม");
    }

    if (!returnDate) {
      return toast.error("กรุณาเลือกวันที่คืน");
    }

    const borrowing: Borrowing = {
      borrowerName,
      department,
      device,
      serialNumber,
      quantity,
      borrowDate: borrowDate.toISOString(),
      returnDate: returnDate.toISOString(),
      id: data.id,
      status: data.status,
    };

    setIsUpdating(true);

    const response = await borrowingsService.updateBorrowing(borrowing);

    if (response.status === 200) {
      updateBorrowing(borrowing);
      toast.success(response.data.message);
    }

    setIsUpdating(false);

    setTimeout(() => {
      document.getElementById("cancel-button")?.click();
    }, 0);
  };

  useEffect(() => {
    setBorrowerName(data.borrowerName);
    setDepartment(data.department);
    setDevice(data.device);
    setSerialNumber(data.serialNumber);
    setQuantity(data.quantity);
    setBorrowDate(new Date(data.borrowDate));
    setReturnDate(new Date(data.returnDate));
  }, [data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <PenIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent
        onOverlayClick={() => document.getElementById("cancel-button")?.click()}
        onCloseClick={() => document.getElementById("cancel-button")?.click()}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>แก้ไขการยืมอุปกรณ์</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="borrowerName">ชื่อผู้ยืม</Label>
              <Input
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                id="borrowerName"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="department">แผนก</Label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                id="department"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="device">อุปกรณ์</Label>
              <Input
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                id="device"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                id="serialNumber"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="quantity">จำนวน</Label>
              <Input
                value={quantity}
                type="number"
                min={1}
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
                id="quantity"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>วันที่ยืม</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start font-normal",
                      !borrowDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {borrowDate ? (
                      format(borrowDate, "dd MMMM yyyy", {
                        locale: th,
                      })
                    ) : (
                      <span>เลือกวันที่</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={borrowDate}
                    onSelect={setBorrowDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label>วันที่คืน</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? (
                      format(returnDate, "dd MMMM yyyy", {
                        locale: th,
                      })
                    ) : (
                      <span>เลือกวันที่</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    fromDate={borrowDate}
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                id="cancel-button"
                onClick={handleCancelClick}
                variant="outline"
              >
                ยกเลิก
              </Button>
            </DialogClose>
            <Button disabled={isUpdating} type="submit">
              {isUpdating ? "กำลังอัพเดต..." : "อัพเดต"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBorrowDialog;
