import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const item = await prisma.item.findUnique({
    where: { id: Number(params.id) }
  });

  return Response.json({ success: true, data: item });
}

export async function PUT(req, { params }) {
  const { name, price, stock } = await req.json();

  const item = await prisma.item.update({
    where: { id: Number(params.id) },
    data: { name, price, stock }
  });

  return Response.json({
    success: true,
    message: "Item updated",
    data: item
  });
}

export async function DELETE(req, { params }) {
  const deleted = await prisma.item.delete({
    where: { id: Number(params.id) }
  });

  return Response.json({
    success: true,
    message: "Item deleted",
    data: deleted
  });
}
