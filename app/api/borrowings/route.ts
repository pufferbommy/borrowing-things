import { connectToDb } from "@/lib/db";
import { type NextRequest } from "next/server";

export async function GET() {
  const cn = await connectToDb();

  const [results] = await cn.query(
    "SELECT * FROM borrowings ORDER BY status DESC"
  );

  cn.end();

  return Response.json(results);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const cn = await connectToDb();

  await cn.query("DELETE FROM borrowings WHERE id=?", [
    parseInt(searchParams.get("id")!),
  ]);

  cn.end();

  return Response.json({ message: "Borrowing deleted" });
}

export async function POST(request: NextRequest) {
  const {
    borrowerName,
    device,
    serialNumber,
    quantity,
    department,
    borrowDate,
    returnDate,
  } = await request.json();
  const status = "ยังไม่คืน";

  const cn = await connectToDb();

  await cn.query(
    "INSERT INTO borrowings (status, borrowerName, device, serialNumber, quantity, department, borrowDate, returnDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      status,
      borrowerName,
      device,
      serialNumber,
      quantity,
      department,
      new Date(borrowDate),
      new Date(returnDate),
    ]
  );

  cn.end();

  return Response.json({ message: "Borrowing added" });
}

export async function PUT(request: NextRequest) {
  const {
    id,
    borrowerName,
    device,
    serialNumber,
    quantity,
    department,
    borrowDate,
    returnDate,
  } = await request.json();

  const cn = await connectToDb();

  await cn.query(
    "UPDATE borrowings SET borrowerName=?, device=?, serialNumber=?, quantity=?, department=?, borrowDate=?, returnDate=? WHERE id=?",
    [
      borrowerName,
      device,
      serialNumber,
      quantity,
      department,
      new Date(borrowDate),
      new Date(returnDate),
      id,
    ]
  );

  cn.end();

  return Response.json({ message: "Borrowing updated" });
}

export async function PATCH(request: NextRequest) {
  const { id, status } = await request.json();

  const cn = await connectToDb();

  await cn.query("UPDATE borrowings SET status=? WHERE id=?", [status, id]);

  cn.end();

  return Response.json({ message: "Borrowing status updated" });
}
