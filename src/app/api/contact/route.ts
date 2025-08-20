import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail", // or your SMTP provider
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER, // PixelForge email
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // App password / SMTP key
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // PixelForge account sends it
    to: "nandi.sweety.06062002@gmail.com", // Fixed inbox
    subject: `Message from ${email}`,
    text: message,
    replyTo: email, // reply goes to user
  });

  return NextResponse.json({ success: true });
}
