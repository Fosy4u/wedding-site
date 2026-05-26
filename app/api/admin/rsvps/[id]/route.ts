import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Rsvp } from "@/models/rsvp";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Params) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const adminKey = process.env.ADMIN_DASHBOARD_KEY;

  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid RSVP id" }, { status: 400 });
  }

  const body = (await request.json()) as { status?: string };

  if (!["pending", "approved", "rejected"].includes(body.status || "")) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const item = await Rsvp.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true },
    );

    if (!item) {
      return NextResponse.json({ message: "RSVP not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "RSVP updated", item });
  } catch (error) {
    console.error("Admin RSVP update error", error);
    return NextResponse.json(
      { message: "Unable to update RSVP right now." },
      { status: 500 },
    );
  }
}
