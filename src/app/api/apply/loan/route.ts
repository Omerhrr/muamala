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
  product: z.string().trim().min(1, "Please choose a loan product").max(120),
  amount: z
    .number({ message: "Please enter a valid amount" })
    .min(10000, "Minimum loan amount is ₦10,000")
    .max(10_000_000, "For facilities above ₦10 million, please visit the branch"),
  term: z
    .number({ message: "Please choose a repayment tenor" })
    .int()
    .min(1, "Please choose a repayment tenor")
    .max(36),
  purpose: z.string().trim().max(1000).optional(),
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
    await db.loanApplication.create({
      data: {
        name: d.name,
        phone: d.phone,
        product: d.product,
        amount: d.amount,
        term: d.term,
        purpose: d.purpose && d.purpose.length > 0 ? d.purpose : null,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Thank you! Your loan application has been received. An officer will contact you within one business day.",
    });
  } catch (error) {
    console.error("Loan application error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
