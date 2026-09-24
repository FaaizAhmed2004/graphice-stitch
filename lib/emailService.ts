import nodemailer from "nodemailer";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  size?: string;
  notes?: string;
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendContactEmail = async (data: ContactFormData) => {
  const transporter = createTransporter();

  // Email to business owner
  await transporter.sendMail({
    from: `"Graphics Stitch Website" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO || process.env.SMTP_USER,
    subject: `New Contact Form Submission — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">📩 New Contact Message</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Graphics Stitch — Website Inquiry</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 120px;"><strong>Name</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;"><strong>Email</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${data.email}" style="color: #7c3aed;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;"><strong>Phone</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.phone}</td></tr>` : ""}
            ${data.service ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;"><strong>Service</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.service}</td></tr>` : ""}
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px; border-left: 4px solid #7c3aed;">
            <strong style="color: #374151;">Message:</strong>
            <p style="color: #4b5563; margin: 8px 0 0; line-height: 1.6;">${data.message}</p>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${data.email}" style="background: linear-gradient(135deg, #7c3aed, #db2777); color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reply to ${data.name}</a>
          </div>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">Graphics Stitch — Professional Embroidery & Vector Art</p>
      </div>
    `,
  });

  // Auto-reply to customer
  await transporter.sendMail({
    from: `"Graphics Stitch" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Thanks for contacting Graphics Stitch, ${data.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Graphics Stitch</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Professional Embroidery & Vector Art</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <h2 style="color: #1f2937;">Hi ${data.name},</h2>
          <p style="color: #4b5563; line-height: 1.6;">Thank you for reaching out to <strong>Graphics Stitch</strong>! We have received your message and our team will get back to you within <strong>24 hours</strong>.</p>
          <div style="margin: 20px 0; padding: 16px; background: #f5f3ff; border-radius: 8px; border-left: 4px solid #7c3aed;">
            <p style="color: #5b21b6; margin: 0; font-weight: bold;">⏱ Next Steps</p>
            <p style="color: #6d28d9; margin: 8px 0 0;">Our digitizing experts will review your inquiry and respond with a quote or answer your questions shortly.</p>
          </div>
          <p style="color: #4b5563; line-height: 1.6;">In the meantime, feel free to browse our <strong>portfolio</strong> or check our <strong>pricing</strong> on the website.</p>
          <div style="margin-top: 20px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://graphicsstitch.com"}" style="background: linear-gradient(135deg, #7c3aed, #db2777); color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Visit Our Website</a>
          </div>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">© 2025 Graphics Stitch. All Rights Reserved.</p>
      </div>
    `,
  });
};

export const sendQuoteEmail = async (data: QuoteFormData) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Graphics Stitch Website" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO || process.env.SMTP_USER,
    subject: `New Quote Request — ${data.service} — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">💼 New Quote Request</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Graphics Stitch</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 140px;"><strong>Name</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;"><strong>Email</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${data.email}" style="color: #7c3aed;">${data.email}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;"><strong>Phone</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.phone}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;"><strong>Service</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><span style="background: #f5f3ff; color: #7c3aed; padding: 2px 10px; border-radius: 20px; font-size: 13px;">${data.service}</span></td></tr>
            ${data.size ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;"><strong>Size / Position</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.size}</td></tr>` : ""}
          </table>
          ${data.notes ? `<div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px; border-left: 4px solid #7c3aed;"><strong>Notes:</strong><p style="color: #4b5563; margin: 8px 0 0;">${data.notes}</p></div>` : ""}
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${data.email}" style="background: linear-gradient(135deg, #7c3aed, #db2777); color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reply with Quote</a>
          </div>
        </div>
      </div>
    `,
  });

  // Auto-reply
  await transporter.sendMail({
    from: `"Graphics Stitch" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Your Quote Request Received — Graphics Stitch`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Graphics Stitch</h1>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1f2937;">Hi ${data.name}, your quote request is received!</h2>
          <p style="color: #4b5563; line-height: 1.6;">We've received your quote request for <strong>${data.service}</strong>. Our team will review your requirements and send you a detailed quote within <strong>a few hours</strong>.</p>
          <p style="color: #4b5563;">Questions? Reply to this email and our team will be happy to help.</p>
        </div>
      </div>
    `,
  });
};
