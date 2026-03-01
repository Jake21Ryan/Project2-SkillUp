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

    const enr = await Enrollment.findById(id);
    if (!enr) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (session.role !== "admin" && String(enr.userId) !== String(session.userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Enrollment.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete enrollment" }, { status: 500 });
  }
}
