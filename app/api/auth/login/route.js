import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return Response.json({ success: false, error: "Unauthorized", code: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return Response.json({ success: false, error: "Unauthorized", code: 401 });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return Response.json({
    success: true,
    message: "Login successful",
    token
  });
}
