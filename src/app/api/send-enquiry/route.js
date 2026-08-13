import { escapeHtml, sendMail } from "@/lib/mailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, course } = body;

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Please fill in all fields." }),
        { status: 400 }
      );
    }

    // Without a destination, nodemailer fails with an opaque "No recipients
    // defined" — name the misconfiguration here so it's obvious in the logs.
    const receiver = process.env.EMAIL_RECEIVER;
    if (!receiver) {
      console.error("No EMAIL_RECEIVER configured — cannot deliver enquiry notification.");
      return new Response(
        JSON.stringify({ message: "Unable to send your message right now. Please try again later." }),
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const safeCourse = course ? escapeHtml(course) : null;

    let htmlBody;

    if (safeCourse) {
      htmlBody = `
        <h2>New Course Enquiry Submission</h2>
        <p><strong>Course:</strong> ${safeCourse}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `;
    } else {
      htmlBody = `
        <h2>New Contact Us Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `;
    }

    await sendMail({
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: receiver,
      // The raw address, not the HTML-escaped copy — this is a header, not
      // markup. Set only when it parses as an address, so a malformed value
      // can't end up in the header block.
      replyTo: EMAIL_REGEX.test(email) ? email : undefined,
      subject: safeCourse
        ? `New Enquiry for Course: ${safeCourse}`
        : "New Contact Us Form Submission",
      html: htmlBody,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Unable to send your message right now. Please try again later." }),
      { status: 500 }
    );
  }
}
