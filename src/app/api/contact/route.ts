import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
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
  subject: z.string().trim().min(2).max(80),
  message: z.string().trim().min(5, "Message is too short").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 }
      );
    }

    const { name, phone, email, subject, message } = parsed.data;

    await db.contactMessage.create({
      data: {
        name,
        phone,
        email: email && email.length > 0 ? email : null,
        subject,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. Our team will contact you shortly.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
