import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req, { params }) {
  await dbConnect();
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();

  const updated = await User.findByIdAndUpdate(id, body, {
    new: true,
    projection: { passwordHash: 0 },
  });

  return NextResponse.json({ ok: true, user: updated });
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await requireAdmin();
  const { id } = await params;
  await User.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
