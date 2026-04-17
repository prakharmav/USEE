/**
 * emailService.js
 * ───────────────
 * Email Notification System using Nodemailer + SMTP.
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Standard SMTP Transporter (Using dummy Gmail details for tests/configs if missing)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'dummy@gmail.com',
    pass: process.env.SMTP_PASS || 'dummypass', 
  },
});

// ── Email Templates ────────────────────────────────────────────────────────────

export const welcomeEmail = (user) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <h2>Welcome to Eduvion, ${user.name}!</h2>
      <p>Your journey to studying abroad officially starts today. We are excited to help you explore curated university recommendations, prepare loan documents, and ace your visa interviews.</p>
      <hr style="border: 0; border-top: 1px solid #eee;" />
      <p>Log in to your dashboard to complete your profile for highly personalized loan recommendations!</p>
      <br/>
      <p>Best,<br/>The Eduvion Team</p>
    </div>
  `;
};

export const nudgeEmail = (user, actionText) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <h3>Hi ${user.name}, we missed you!</h3>
      <p>It's been a couple of days since your last action. Small steps every day make your study-abroad dream a reality.</p>
      <div style="background-color: #f4f6f8; padding: 15px; border-radius: 5px;">
        <strong>Recommended Next Step:</strong> ${actionText}
      </div>
      <br/>
      <p>Click here to hop back onto your journey map.</p>
      <p>Best,<br/>Your AI Counselor @ Eduvion</p>
    </div>
  `;
};

export const loanStatusEmail = (user, status) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <h3>Loan Application Update</h3>
      <p>Hi ${user.name}, your loan application status has been changed to: <strong style="text-transform: uppercase;">${status}</strong>.</p>
      <p>Check your dashboard for the detailed next steps.</p>
    </div>
  `;
};

export const applicationTimelineEmail = (user, deadlines) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <h3>Upcoming Deadlines</h3>
      <p>Hi ${user.name}, here are some critical timeline dates you should keep an eye on:</p>
      <ul>
        ${deadlines.map(d => `<li><strong>${d.date}</strong>: ${d.event}</li>`).join('')}
      </ul>
    </div>
  `;
};

// ── Generic Send Wrapper ───────────────────────────────────────────────────────
export const sendNotification = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: `"Eduvion" <${process.env.SMTP_USER || 'no-reply@eduvion.com'}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log(`[EMAIL SEND] Sent to: ${to} - id: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[EMAIL ERROR] Could not send to ${to}`, error);
    // Suppress throwing internally so main app doesn't crash on failed emails
  }
};
