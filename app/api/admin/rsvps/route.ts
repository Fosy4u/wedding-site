import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Rsvp } from "@/models/rsvp";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const adminKey = process.env.ADMIN_DASHBOARD_KEY;

  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const items = await Rsvp.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Admin RSVP fetch error", error);
    return NextResponse.json(
      { message: "Unable to fetch RSVP records right now." },
      { status: 500 },
    );
  }
}
