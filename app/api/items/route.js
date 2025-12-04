import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany();
  return Response.json({ success: true, data: items });
}

export async function POST(req) {
  const { name, price, stock } = await req.json();

  const item = await prisma.item.create({
    data: { name, price, stock }
  });

  return Response.json({
    success: true,
    message: "Item created",
    data: item
  });
}
