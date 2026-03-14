import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>", // replace with verified domain
    to: ["mtalhamanzoor786@gmail.com"],                         // replace with your email
    replyTo: email,
    subject: `Portfolio Inquiry — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }

  return Response.json({ success: true });
}