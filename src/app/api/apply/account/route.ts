import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Phone number can only contain digits and + - ( )"),
  email: z
    .union([z.string().trim().max(120).email("Please enter a valid email address"), z.literal("")])
    .optional(),
  address: z.string().trim().max(300).optional(),
  type: z.enum(["individual", "group", "business"]),
  bvn: z
    .string()
    .trim()
    .max(11)
    .regex(/^[0-9]*$/, "BVN can only contain digits")
    .optional(),
  note: z.string().trim().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    const d = parsed.data;
    await db.accountRequest.create({
      data: {
        name: d.name,
        phone: d.phone,
        email: d.email && d.email.length > 0 ? d.email : null,
        address: d.address && d.address.length > 0 ? d.address : null,
        type: d.type,
        bvn: d.bvn && d.bvn.length > 0 ? d.bvn : null,
        note: d.note && d.note.length > 0 ? d.note : null,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Thank you! Your account request has been received — our team will call you shortly.",
    });
  } catch (error) {
    console.error("Account request error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
