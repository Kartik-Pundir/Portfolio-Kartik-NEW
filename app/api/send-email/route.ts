import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const cvPath = path.join(process.cwd(), "public", "resume.pdf");

  try {
    // Send both emails in parallel for speed
    await Promise.all([
      // 1. Notification to Kartik
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: "Kartikpundir231@gmail.com",
        subject: `📬 New Message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(168,85,247,0.3)">
            <h2 style="color:#a855f7;margin-bottom:24px">New Portfolio Message</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#94a3b8;width:80px">Name</td><td style="padding:8px 0;color:#fff;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0;color:#fff">${email}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:rgba(168,85,247,0.06);border-radius:8px;border:1px solid rgba(168,85,247,0.15)">
              <p style="color:#94a3b8;margin:0 0 8px;font-size:12px">MESSAGE</p>
              <p style="color:#e2e8f0;margin:0;line-height:1.6">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="margin-top:24px;color:#475569;font-size:12px">Sent from your portfolio contact form</p>
          </div>
        `,
      }),

      // 2. Auto-reply to sender with CV attached
      transporter.sendMail({
        from: `"Kartik Pundir" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thanks for reaching out! — Kartik Pundir",
        attachments: fs.existsSync(cvPath)
          ? [{ filename: "KartikPundir_CV.pdf", path: cvPath }]
          : [],
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e2e8f0;padding:36px;border-radius:12px;border:1px solid rgba(168,85,247,0.25)">
            <div style="text-align:center;margin-bottom:32px">
              <h1 style="color:#a855f7;font-size:26px;margin:0;letter-spacing:1px">Kartik Pundir</h1>
              <p style="color:#64748b;font-size:13px;margin:6px 0 0">Full Stack Developer · Open to Work</p>
            </div>
            <p style="color:#e2e8f0;font-size:15px">Hi <strong style="color:#c084fc">${name}</strong>,</p>
            <p style="color:#94a3b8;line-height:1.8;font-size:14px">
              Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible — typically within 24 hours.
            </p>
            <div style="margin:24px 0;padding:18px;background:rgba(168,85,247,0.06);border-radius:8px;border-left:3px solid #a855f7">
              <p style="color:#64748b;margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px">Your Message</p>
              <p style="color:#cbd5e1;margin:0;line-height:1.7;font-size:14px;font-style:italic">"${message.replace(/\n/g, "<br>")}"</p>
            </div>
            <p style="color:#94a3b8;line-height:1.8;font-size:14px">
              While you wait, feel free to explore my work. I've also attached my CV for your reference:
            </p>
            <div style="margin:20px 0">
              <a href="https://github.com/Kartik-Pundir" target="_blank"
                style="display:inline-block;margin:4px;padding:10px 20px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.3);border-radius:8px;color:#c084fc;text-decoration:none;font-size:13px;font-weight:600">
                🐙 GitHub
              </a>
              <a href="https://www.linkedin.com/in/kartik-pundir816/" target="_blank"
                style="display:inline-block;margin:4px;padding:10px 20px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.3);border-radius:8px;color:#c084fc;text-decoration:none;font-size:13px;font-weight:600">
                💼 LinkedIn
              </a>
              <a href="mailto:Kartikpundir231@gmail.com"
                style="display:inline-block;margin:4px;padding:10px 20px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.3);border-radius:8px;color:#c084fc;text-decoration:none;font-size:13px;font-weight:600">
                ✉️ Email
              </a>
            </div>
            <p style="color:#e2e8f0;margin-top:28px;font-size:14px">
              Best regards,<br>
              <strong style="color:#a855f7;font-size:16px">Kartik Pundir</strong>
            </p>
            <hr style="border:none;border-top:1px solid rgba(168,85,247,0.1);margin:28px 0 16px">
            <p style="color:#334155;font-size:11px;text-align:center;margin:0">
              Kartikpundir231@gmail.com &nbsp;·&nbsp;
              <a href="https://github.com/Kartik-Pundir" style="color:#334155;text-decoration:none">github.com/Kartik-Pundir</a> &nbsp;·&nbsp;
              <a href="https://www.linkedin.com/in/kartik-pundir816/" style="color:#334155;text-decoration:none">linkedin.com/in/kartik-pundir816</a>
            </p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
