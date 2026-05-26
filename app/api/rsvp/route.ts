import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Rsvp } from "@/models/rsvp";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      phone?: string;
      attending?: "yes" | "no";
      plusOne?: "yes" | "no";
      message?: string;
    };

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { message: "Full name, email, and phone are required." },
        { status: 400 },
      );
    }

    if (body.attending !== "yes" && body.attending !== "no") {
      return NextResponse.json(
        { message: "Invalid attending value." },
        { status: 400 },
      );
    }

    if (body.plusOne !== "yes" && body.plusOne !== "no") {
      return NextResponse.json(
        { message: "Invalid plus one value." },
        { status: 400 },
      );
    }

    await connectToDatabase();

    await Rsvp.findOneAndUpdate(
      { email: body.email.toLowerCase().trim() },
      {
        fullName: body.fullName.trim(),
        email: body.email.toLowerCase().trim(),
        phone: body.phone.trim(),
        attending: body.attending,
        plusOne: body.plusOne,
        message: body.message?.trim() || "",
        status: "pending",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return NextResponse.json({
      message: "RSVP received. We will review and follow up.",
    });
  } catch (error) {
    console.error("RSVP submission error", error);
    return NextResponse.json(
      { message: "Unable to submit RSVP right now. Please try again." },
      { status: 500 },
    );
  }
}
