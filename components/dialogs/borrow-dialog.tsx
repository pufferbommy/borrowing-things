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
import { FormEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { th } from "date-fns/locale";
import { toast } from "sonner";
import { Borrowing } from "@/interfaces/borrowing";
import * as borrowingsService from "@/services/borrowingsService";
import { setBorrowings } from "@/stores/borrowings";

const BorrowDialog = () => {
  const [borrowerName, setBorrowerName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [device, setDevice] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [borrowDate, setBorrowDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCancelClick = () => {
    setBorrowerName("");
    setDepartment("");
    setDevice("");
    setSerialNumber("");
    setQuantity(1);
    setBorrowDate(undefined);
    setReturnDate(undefined);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!borrowDate) {
      return toast.error("กรุณาเลือกวันที่ยืม");
    }

    if (!returnDate) {
      return toast.error("กรุณาเลือกวันที่คืน");
    }

    const borrowing: Omit<Omit<Borrowing, "id">, "status"> = {
      borrower_name: borrowerName,
      department,
      device,
      serial_number: serialNumber,
      quantity,
      borrow_date: borrowDate.toISOString(),
      return_date: returnDate.toISOString(),
    };

    setIsCreating(true);

    const response = await borrowingsService.createBorrowing(borrowing);
    toast.success(response.data.message);

    if (response.status === 200) {
      const response = await borrowingsService.getBorrowings();
      setBorrowings(response.data);
    }

    setIsCreating(false);

    setTimeout(() => {
      document.getElementById("cancel-button")?.click();
    }, 0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>สร้างการยืมอุปกรณ์</Button>
      </DialogTrigger>
      <DialogContent
        onOverlayClick={() => document.getElementById("cancel-button")?.click()}
        onCloseClick={() => document.getElementById("cancel-button")?.click()}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>สร้างการยืมอุปกรณ์</DialogTitle>
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
                disabled={isCreating}
                id="cancel-button"
                onClick={handleCancelClick}
                variant="outline"
              >
                ยกเลิก
              </Button>
            </DialogClose>
            <Button disabled={isCreating} type="submit">
              {isCreating ? "กำลังสร้าง..." : "สร้าง"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowDialog;
