import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let htmlBody;

    if (course) {
      htmlBody = `
        <h2>New Course Enquiry Submission</h2>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      `;
    } else {
      htmlBody = `
        <h2>New Contact Us Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      `;
    }

    const mailOptions = {
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: course
        ? `New Enquiry for Course: ${course}`
        : "New Contact Us Form Submission",
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: error.message || error }), {
      status: 500,
    });
  }
}
