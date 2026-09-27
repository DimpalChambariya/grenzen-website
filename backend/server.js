require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const { company, categories, products, upcoming, industries, qualityProcess } = require("./data/catalogue");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory store for quote/contact requests submitted from the website.
const enquiries = [];

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createMailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "info@grenzenpharmachem.com";
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });
}

async function sendEnquiryEmail(enquiry) {
  const transporter = createMailTransporter();
  if (!transporter) {
    console.warn("[Email Warning] SMTP_PASS is not set in backend/.env. Email dispatch skipped.");
    return { success: false, reason: "SMTP_PASS not configured" };
  }

  const user = process.env.SMTP_USER || "info@grenzenpharmachem.com";
  const fromAddress = process.env.EMAIL_FROM || `"Grenzen Pharmachem Website" <${user}>`;
  const toAddress = process.env.EMAIL_TO || user;

  const formattedDate = new Date(enquiry.receivedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short"
  });

  const mailOptions = {
    from: fromAddress,
    to: toAddress,
    replyTo: `"${enquiry.name}" <${enquiry.email}>`,
    subject: `New Website Enquiry: ${enquiry.product} — ${enquiry.name}${enquiry.company ? ` (${enquiry.company})` : ""}`,
    text: `
NEW WEBSITE ENQUIRY RECEIVED
============================

Customer Details:
-----------------
Full Name:        ${enquiry.name}
Company Name:     ${enquiry.company || "Not specified"}
Email Address:    ${enquiry.email}
Phone Number:     ${enquiry.phone || "Not specified"}
Product Interest: ${enquiry.product}
Submitted Date:   ${formattedDate} IST

Message / Requirements:
-----------------------
${enquiry.message}

--
This enquiry was submitted via the contact form on https://www.grenzenpharmachem.com.
You can reply directly to this email to contact ${enquiry.name} (${enquiry.email}).
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f1ed; margin: 0; padding: 24px; color: #0f1e2b; -webkit-font-smoothing: antialiased; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #d8d5cf; box-shadow: 0 4px 18px rgba(8, 27, 45, 0.08); }
    .header { background: #081b2d; padding: 24px 28px; color: #ffffff; border-bottom: 4px solid #0f90be; }
    .header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 700; color: #ffffff; }
    .header p { margin: 0; font-size: 12px; color: #00d7ff; font-family: ui-monospace, monospace; letter-spacing: 0.08em; text-transform: uppercase; }
    .content { padding: 28px; }
    .badge { display: inline-block; background: #f7e9c7; color: #9c6e00; font-size: 12px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 20px; }
    .field-table { width: 100%; border-collapse: collapse; margin-bottom: 22px; }
    .field-table td { padding: 10px 0; border-bottom: 1px solid #ece8e1; font-size: 14px; vertical-align: top; }
    .field-table td.label { width: 34%; color: #536273; font-weight: 600; }
    .field-table td.value { color: #081b2d; }
    .message-title { font-weight: 700; font-size: 13px; color: #536273; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
    .message-box { background: #f8f6f2; border-left: 4px solid #0f90be; padding: 16px; border-radius: 0 6px 6px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #0f1e2b; }
    .footer { background: #f3f1ed; padding: 18px 28px; font-size: 12px; color: #536273; text-align: center; border-top: 1px solid #d8d5cf; }
    .footer a { color: #0b7ca1; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Grenzen Pharmachem</h1>
      <p>New Website Contact Enquiry</p>
    </div>
    <div class="content">
      <span class="badge">Product: ${escapeHtml(enquiry.product)}</span>

      <table class="field-table">
        <tr>
          <td class="label">Customer Name</td>
          <td class="value"><strong>${escapeHtml(enquiry.name)}</strong></td>
        </tr>
        <tr>
          <td class="label">Company</td>
          <td class="value">${escapeHtml(enquiry.company || "—")}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${escapeHtml(enquiry.email)}" style="color: #0b7ca1; font-weight: 600;">${escapeHtml(enquiry.email)}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value">${enquiry.phone ? `<a href="tel:${escapeHtml(enquiry.phone)}" style="color: #0b7ca1;">${escapeHtml(enquiry.phone)}</a>` : "—"}</td>
        </tr>
        <tr>
          <td class="label">Product Interest</td>
          <td class="value"><strong>${escapeHtml(enquiry.product)}</strong></td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td class="value">${formattedDate} IST</td>
        </tr>
      </table>

      <div class="message-title">Message / Requirement Details:</div>
      <div class="message-box">${escapeHtml(enquiry.message)}</div>
      <div style="margin-top: 24px; padding: 18px; background: #eef7fa; border-radius: 6px; border: 1px solid #c7e8f3;">
        <span style="font-size: 12px; font-weight: 700; color: #0b7ca1; text-transform: uppercase; letter-spacing: 0.05em;">Action:</span>
        <div style="margin-top: 8px;">
          <a href="mailto:${escapeHtml(enquiry.email)}?subject=Re: Enquiry for ${encodeURIComponent(enquiry.product)} - Grenzen Pharmachem" style="display: inline-block; background: #0f90be; color: #ffffff; padding: 9px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 13px; margin-right: 10px;">Reply to Customer</a>
          ${enquiry.phone ? `<a href="tel:${escapeHtml(enquiry.phone)}" style="display: inline-block; background: #081b2d; color: #ffffff; padding: 9px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 13px;">Call ${escapeHtml(enquiry.phone)}</a>` : ""}
        </div>
      </div>

      <div style="border-top: 2px solid #0f90be; margin-top: 28px; padding-top: 18px;">
        <h4 style="margin: 0 0 4px; color: #081b2d; font-size: 15px; font-weight: 700;">Grenzen Pharmachem Industries Pvt. Ltd.</h4>
        <p style="margin: 0 0 6px; font-size: 12px; color: #0f90be; font-weight: 600;">Chemistry that powers industry</p>
        <p style="margin: 0; font-size: 12px; color: #536273; line-height: 1.5;">
          <strong>Corporate Office:</strong> Raghuvir Chamber, ISKCON Mandir Road, Vallabh Vidyanagar, Anand, Gujarat 388120<br>
          <strong>Warehouses:</strong> Mogri (Chemicals &amp; Dyes) &middot; Navsari (Agro commodities)
        </p>
        <p style="margin: 6px 0 0; font-size: 12px; color: #536273;">
          <strong>CIN:</strong> U21001GJ2026PTC172674 &middot; <strong>GSTIN:</strong> 24AAMCG7263L1Z4
        </p>
        <p style="margin: 6px 0 0; font-size: 12px;">
          <a href="tel:+918490008908" style="color: #0b7ca1; text-decoration: none; font-weight: 600;">+91 84900 08908</a> &middot;
          <a href="mailto:info@grenzenpharmachem.com" style="color: #0b7ca1; text-decoration: none; font-weight: 600;">info@grenzenpharmachem.com</a> &middot;
          <a href="https://www.grenzenpharmachem.com" style="color: #0b7ca1; text-decoration: none; font-weight: 600;">www.grenzenpharmachem.com</a>
        </p>
      </div>
    </div>
    <div class="footer">
      Sent from <a href="https://www.grenzenpharmachem.com">www.grenzenpharmachem.com</a> &bull; Reply directly to this email to respond to ${escapeHtml(enquiry.name)}.
    </div>
  </div>
</body>
</html>
    `.trim()
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[Email Success] Enquiry notification dispatched to ${toAddress}. Message ID: ${info.messageId}`);

  // Send acknowledgement email to customer
  if (enquiry.email && enquiry.email.includes("@")) {
    try {
      await transporter.sendMail({
        from: fromAddress,
        to: `"${enquiry.name}" <${enquiry.email}>`,
        subject: `Enquiry Received: ${enquiry.product} — Grenzen Pharmachem Industries`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f1ed; margin: 0; padding: 24px; color: #0f1e2b; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #d8d5cf; }
    .header { background: #081b2d; padding: 24px; color: #ffffff; border-bottom: 4px solid #0f90be; }
    .header h1 { margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #ffffff; }
    .content { padding: 26px; font-size: 14px; line-height: 1.6; }
    .box { background: #f8f6f2; border-left: 4px solid #0f90be; padding: 14px 16px; margin: 16px 0; border-radius: 0 4px 4px 0; font-size: 14px; }
    .footer { background: #f3f1ed; padding: 16px 24px; font-size: 12px; color: #536273; text-align: center; border-top: 1px solid #d8d5cf; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Grenzen Pharmachem Industries</h1>
      <p style="margin: 0; font-size: 13px; color: #00d7ff; font-family: monospace;">ENQUIRY CONFIRMATION</p>
    </div>
    <div class="content">
      <p style="font-size: 15px; margin-top: 0;">Dear <strong>${escapeHtml(enquiry.name)}</strong>,</p>
      <p>Thank you for contacting Grenzen Pharmachem Industries Pvt. Ltd. We have successfully received your enquiry regarding <strong>${escapeHtml(enquiry.product)}</strong>.</p>
      
      <div class="box">
        <strong style="color: #081b2d;">Requirement Summary:</strong><br>
        &bull; Product: <strong>${escapeHtml(enquiry.product)}</strong><br>
        ${enquiry.company ? `&bull; Company: ${escapeHtml(enquiry.company)}<br>` : ""}
        &bull; Submitted: ${formattedDate} IST<br><br>
        <strong>Your Requirement Details:</strong><br>
        ${escapeHtml(enquiry.message)}
      </div>

      <p>Our technical and sales team is reviewing your requirements and will reach out with the agreed specifications and commercial proposal shortly.</p>
      <p style="color: #536273; font-size: 13px;">If you have any urgent queries, please call us directly at <a href="tel:+918490008908" style="color: #0b7ca1; font-weight: 600;">+91 84900 08908</a> or reply to this email.</p>

      <div style="border-top: 2px solid #0f90be; margin-top: 28px; padding-top: 18px;">
        <h4 style="margin: 0 0 4px; color: #081b2d; font-size: 15px; font-weight: 700;">Grenzen Pharmachem Industries Pvt. Ltd.</h4>
        <p style="margin: 0 0 6px; font-size: 12px; color: #0f90be; font-weight: 600;">Chemistry that powers industry</p>
        <p style="margin: 0; font-size: 12px; color: #536273; line-height: 1.5;">
          <strong>Corporate Office:</strong> Raghuvir Chamber, ISKCON Mandir Road, Vallabh Vidyanagar, Anand, Gujarat 388120<br>
          <strong>Warehouses:</strong> Mogri (Chemicals &amp; Dyes) &middot; Navsari (Agro commodities)
        </p>
        <p style="margin: 6px 0 0; font-size: 12px; color: #536273;">
          <strong>CIN:</strong> U21001GJ2026PTC172674 &middot; <strong>GSTIN:</strong> 24AAMCG7263L1Z4
        </p>
        <p style="margin: 6px 0 0; font-size: 12px;">
          <a href="tel:+918490008908" style="color: #0b7ca1; text-decoration: none; font-weight: 600;">+91 84900 08908</a> &middot;
          <a href="mailto:info@grenzenpharmachem.com" style="color: #0b7ca1; text-decoration: none; font-weight: 600;">info@grenzenpharmachem.com</a> &middot;
          <a href="https://www.grenzenpharmachem.com" style="color: #0b7ca1; text-decoration: none; font-weight: 600;">www.grenzenpharmachem.com</a>
        </p>
      </div>
    </div>
    <div class="footer">
      Grenzen Pharmachem Industries Pvt. Ltd. &middot; Anand, Gujarat, India<br>
      <a href="https://www.grenzenpharmachem.com" style="color: #0b7ca1;">www.grenzenpharmachem.com</a>
    </div>
  </div>
</body>
</html>
        `.trim()
      });
      console.log(`[Email Success] Customer confirmation dispatched to ${enquiry.email}`);
    } catch (custErr) {
      console.warn(`[Email Warning] Could not send confirmation to customer ${enquiry.email}:`, custErr.message);
    }
  }

  return { success: true, messageId: info.messageId };
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "grenzen-pharmachem-api",
    time: new Date().toISOString(),
    smtpConfigured: Boolean(process.env.SMTP_PASS)
  });
});

app.get("/api/company", (req, res) => {
  res.json(company);
});

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/products", (req, res) => {
  const { category, q } = req.query;
  let result = products;

  if (category) {
    result = result.filter((p) => p.categoryId === category);
  }
  if (q) {
    const needle = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.code.toLowerCase().includes(needle)
    );
  }
  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.get("/api/upcoming", (req, res) => {
  res.json(upcoming);
});

app.get("/api/industries", (req, res) => {
  res.json(industries);
});

app.get("/api/quality-process", (req, res) => {
  res.json(qualityProcess);
});

app.get("/api/stats", (req, res) => {
  res.json(company.stats);
});

app.post("/api/enquiries", async (req, res) => {
  const { name, company: companyName, email, phone, product, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const enquiry = {
    id: enquiries.length + 1,
    name,
    company: companyName || "",
    email,
    phone: phone || "",
    product: product || "General enquiry",
    message,
    receivedAt: new Date().toISOString()
  };

  enquiries.push(enquiry);
  console.log("New enquiry received:", enquiry);

  let emailResult = { success: false };
  try {
    emailResult = await sendEnquiryEmail(enquiry);
  } catch (err) {
    console.error("[Email Error] Failed to send email notification:", err.message);
  }

  res.status(201).json({
    message: "Thank you — your enquiry has been received. Our team will respond shortly.",
    enquiry,
    emailDispatched: emailResult.success
  });
});

// Admin-style listing, useful for testing the enquiry flow locally.
app.get("/api/enquiries", (req, res) => {
  res.json(enquiries);
});

// Test SMTP configuration endpoint
app.get("/api/test-email", async (req, res) => {
  if (!process.env.SMTP_PASS) {
    return res.status(400).json({
      status: "error",
      message: "SMTP_PASS is not set in backend/.env. Please add your email password or App Password to .env."
    });
  }

  try {
    const transporter = createMailTransporter();
    await transporter.verify();
    return res.json({
      status: "ok",
      message: `SMTP connection verified successfully to ${process.env.SMTP_HOST || "smtp.gmail.com"} as ${process.env.SMTP_USER || "info@grenzenpharmachem.com"}.`
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: `SMTP verification failed: ${err.message}`
    });
  }
});
// Serve frontend production build files
const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));

// Direct catalogue static serving
app.use("/catalogue", express.static(path.join(distPath, "catalogue")));

// SPA fallback: any non-API route serves frontend index.html
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Grenzen Pharmachem API listening on http://localhost:${PORT}`);
  if (!process.env.SMTP_PASS) {
    console.log("Note: SMTP_PASS is empty in backend/.env. Add your password to enable automatic email dispatch.");
  }
});
