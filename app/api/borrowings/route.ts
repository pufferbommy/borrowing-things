import { connectToDb } from "@/lib/db";
import { type NextRequest } from "next/server";

export async function GET() {
  const client = await connectToDb();

  const result = await client.query(
    "SELECT * FROM borrowings ORDER BY status DESC"
  );

  await client.end();

  return Response.json(result.rows);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const client = await connectToDb();

  await client.query("DELETE FROM borrowings WHERE id = $1", [
    parseInt(searchParams.get("id")!),
  ]);

  await client.end();

  return Response.json({ message: "การยืม-คืนอุปกรณ์ถูกลบแล้ว" });
}

export async function POST(request: NextRequest) {
  const status = "ยังไม่คืน";
  const {
    borrower_name,
    device,
    serial_number,
    quantity,
    department,
    borrow_date,
    return_date,
  } = await request.json();

  const client = await connectToDb();

  const res = await client.query(
    "SELECT id FROM borrowings ORDER BY id DESC LIMIT 1"
  );

  const id = (res.rows[0]?.id || 1) + 1;

  await client.query({
    text: "INSERT INTO borrowings(id, status, borrower_name, device, serial_number, quantity, department, borrow_date, return_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    values: [
      id,
      status,
      borrower_name,
      device,
      serial_number,
      quantity,
      department,
      new Date(borrow_date).toISOString(),
      new Date(return_date).toISOString(),
    ],
  });

  await client.end();

  return Response.json({ message: "การยืม-คืนอุปกรณ์ถูกเพิ่มแล้ว" });
}

export async function PUT(request: NextRequest) {
  const {
    id,
    borrower_name,
    device,
    serial_number,
    quantity,
    department,
    borrow_date,
    return_date,
  } = await request.json();

  const client = await connectToDb();

  await client.query({
    text: "UPDATE borrowings SET borrower_name=$1, device=$2, serial_number=$3, quantity=$4, department=$5, borrow_date=$6, return_date=$7 WHERE id=$8",
    values: [
      borrower_name,
      device,
      serial_number,
      quantity,
      department,
      new Date(borrow_date),
      new Date(return_date),
      id,
    ],
  });

  await client.end();

  return Response.json({ message: "การยืม-คืนอุปกรณ์ถูกอัพเดตแล้ว" });
}

export async function PATCH(request: NextRequest) {
  const { id, status } = await request.json();

  const client = await connectToDb();

  await client.query("UPDATE borrowings SET status=$1 WHERE id=$2", [
    status,
    id,
  ]);

  await client.end();

  return Response.json({
    message: "สถานะการยืม-คืนอุปกรณ์ถูกอัพเดตแล้ว",
  });
}
