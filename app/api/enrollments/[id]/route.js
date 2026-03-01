import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Enrollment } from "@/models/Enrollment";
import { requireSession } from "@/lib/auth";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const session = await requireSession();
    const { id } = await params;
    const body = await req.json();

    const enr = await Enrollment.findById(id);
    if (!enr) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (session.role !== "admin" && String(enr.userId) !== String(session.userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await Enrollment.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ ok: true, enrollment: updated });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update enrollment" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const session = await requireSession();
    const { id } = await params;

    if (session.role === "admin") {
      const deleted = await Enrollment.findByIdAndDelete(id);
      if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    const deleted = await Enrollment.findOneAndDelete({ _id: id, userId: session.userId });
    if (!deleted) {
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete enrollment" }, { status: 500 });
  }
}
