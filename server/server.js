// ======================================================
// PUNJAB HOUSE KARACHI - BOOKING API
// Railway Production Backend
// ======================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const nodemailer = require("nodemailer");
const { jsPDF } = require("jspdf");

// ======================================================
// ENVIRONMENT
// ======================================================

dotenv.config();

// Prefer IPv4
try {
  dns.setDefaultResultOrder("ipv4first");
} catch (error) {
  console.log("⚠️ IPv4 DNS preference unavailable.");
}

const app = express();

// IMPORTANT:
// Railway provides process.env.PORT automatically.
const PORT = process.env.PORT || 5000;

// ======================================================
// RAILWAY BACKEND
// ======================================================

const RAILWAY_URL =
  "https://punjab-house-production.up.railway.app";

// ======================================================
// ALLOWED FRONTEND ORIGINS
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://punjab-house-karachi.netlify.app",
];

// ======================================================
// CORS
// ======================================================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, curl and server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("⚠️ CORS blocked:", origin);

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },

    methods: [
      "GET",
      "POST",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: false,
  })
);

// Explicit OPTIONS handling
app.options("*", cors());

// ======================================================
// BODY PARSER
// ======================================================

app.use(
  express.json({
    limit: "2mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  })
);

// ======================================================
// SERVER INFORMATION
// ======================================================

console.log("======================================");
console.log("Punjab House Karachi Booking API");
console.log("======================================");

console.log(
  "Railway URL:",
  RAILWAY_URL
);

console.log(
  "GMAIL_USER:",
  process.env.GMAIL_USER
    ? "SET"
    : "MISSING"
);

console.log(
  "GMAIL_APP_PASSWORD:",
  process.env.GMAIL_APP_PASSWORD
    ? "SET"
    : "MISSING"
);

console.log(
  "ADMIN_EMAIL:",
  process.env.ADMIN_EMAIL
    ? "SET"
    : "MISSING"
);

console.log(
  "PORT:",
  PORT
);

console.log("======================================");

// ======================================================
// GMAIL SMTP TRANSPORTER
// ======================================================

let transporter = null;

if (
  process.env.GMAIL_USER &&
  process.env.GMAIL_APP_PASSWORD
) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    requireTLS: true,

    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },

    family: 4,

    connectionTimeout: 10000,

    greetingTimeout: 10000,

    socketTimeout: 15000,

    tls: {
      rejectUnauthorized: true,
    },
  });

  console.log(
    "📧 Gmail SMTP transporter created."
  );
} else {
  console.error(
    "❌ Gmail SMTP transporter was NOT created."
  );

  console.error(
    "⚠️ Check Railway Variables:"
  );

  console.error(
    "GMAIL_USER"
  );

  console.error(
    "GMAIL_APP_PASSWORD"
  );
}

// ======================================================
// VERIFY EMAIL
// ======================================================

async function verifyEmail() {
  if (!transporter) {
    console.log(
      "⚠️ Email verification skipped."
    );

    return false;
  }

  try {
    console.log(
      "📧 Testing Gmail SMTP connection..."
    );

    await transporter.verify();

    console.log(
      "✅ Gmail SMTP connection successful."
    );

    return true;
  } catch (error) {
    console.error(
      "❌ Gmail SMTP connection failed."
    );

    console.error(
      "Code:",
      error.code || "UNKNOWN"
    );

    console.error(
      "Message:",
      error.message || "Unknown error"
    );

    console.error(
      "⚠️ Server will continue running."
    );

    return false;
  }
}

// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ======================================================
// PDF GENERATOR
// ======================================================

function generateBookingPDF(data) {
  const doc = new jsPDF(
    "p",
    "mm",
    "a4"
  );

  const GREEN = [
    0,
    200,
    116,
  ];

  const DARK = [
    15,
    23,
    42,
  ];

  const TEXT = [
    30,
    41,
    59,
  ];

  const MUTED = [
    100,
    116,
    139,
  ];

  const BORDER = [
    203,
    213,
    225,
  ];

  const LIGHT = [
    248,
    250,
    252,
  ];

  const GREEN_LIGHT = [
    236,
    253,
    245,
  ];

  const RED_LIGHT = [
    255,
    247,
    247,
  ];

  const WHITE = [
    255,
    255,
    255,
  ];

  const PAGE_WIDTH = 210;

  const LEFT = 15;

  const RIGHT = 195;

  const CONTENT_WIDTH =
    RIGHT - LEFT;

  let y = 15;

  // ====================================================
  // PAGE HEADER
  // ====================================================

  function drawPageHeader() {
    doc.setFillColor(...DARK);

    doc.rect(
      0,
      0,
      PAGE_WIDTH,
      35,
      "F"
    );

    // Logo
    doc.setFillColor(...GREEN);

    doc.circle(
      25,
      17.5,
      7,
      "F"
    );

    doc.setTextColor(...WHITE);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(9);

    doc.text(
      "PH",
      25,
      20.2,
      {
        align: "center",
      }
    );

    // Punjab House
    doc.setTextColor(...WHITE);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(15);

    doc.text(
      "Punjab House",
      37,
      15
    );

    doc.setTextColor(
      148,
      163,
      184
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(7);

    doc.text(
      "EVENT VENUE",
      37,
      22
    );

    // Right side
    doc.setTextColor(...GREEN);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);

    doc.text(
      "BOOKING REQUEST FORM",
      RIGHT,
      14,
      {
        align: "right",
      }
    );

    doc.setTextColor(
      203,
      213,
      225
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(7);

    doc.text(
      "GOR-1, Bath Island, Clifton, Karachi",
      RIGHT,
      21,
      {
        align: "right",
      }
    );

    y = 44;
  }

  // ====================================================
  // FOOTER
  // ====================================================

  function drawFooter() {
    doc.setDrawColor(...BORDER);

    doc.setLineWidth(0.3);

    doc.line(
      LEFT,
      280,
      RIGHT,
      280
    );

    doc.setTextColor(...MUTED);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(7);

    doc.text(
      "Punjab House Karachi | Booking Form",
      LEFT,
      287
    );

    doc.text(
      "Completed Booking Request",
      RIGHT,
      287,
      {
        align: "right",
      }
    );
  }

  // ====================================================
  // NEW PAGE
  // ====================================================

  function addNewPage() {
    drawFooter();

    doc.addPage();

    drawPageHeader();
  }

  // ====================================================
  // SPACE CHECK
  // ====================================================

  function ensureSpace(height = 20) {
    if (y + height > 270) {
      addNewPage();
    }
  }

  // ====================================================
  // SECTION HEADER
  // ====================================================

  function drawSectionHeading(
    title,
    subtitle = ""
  ) {
    ensureSpace(23);

    doc.setFillColor(...LIGHT);

    doc.roundedRect(
      LEFT,
      y,
      CONTENT_WIDTH,
      15,
      3,
      3,
      "F"
    );

    doc.setFillColor(...GREEN);

    doc.roundedRect(
      LEFT,
      y,
      3,
      15,
      1.5,
      1.5,
      "F"
    );

    doc.setTextColor(...DARK);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(11);

    doc.text(
      title,
      LEFT + 8,
      y + 7
    );

    if (subtitle) {
      doc.setTextColor(...MUTED);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(7);

      doc.text(
        subtitle,
        LEFT + 8,
        y + 12
      );
    }

    y += 21;
  }

  // ====================================================
  // SINGLE FIELD
  // ====================================================

  function drawField(
    label,
    value,
    options = {}
  ) {
    const {
      width = CONTENT_WIDTH,
      height = 14,
      multiline = false,
    } = options;

    ensureSpace(height + 7);

    doc.setTextColor(...TEXT);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);

    doc.text(
      label,
      LEFT,
      y
    );

    y += 3;

    doc.setFillColor(...WHITE);

    doc.setDrawColor(...BORDER);

    doc.setLineWidth(0.35);

    doc.roundedRect(
      LEFT,
      y,
      width,
      height,
      2,
      2,
      "FD"
    );

    const safeValue =
      value || " ";

    const lines =
      doc.splitTextToSize(
        String(safeValue),
        width - 8
      );

    doc.setTextColor(...TEXT);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(8);

    if (multiline) {
      doc.text(
        lines,
        LEFT + 4,
        y + 5
      );
    } else {
      doc.text(
        lines.slice(0, 1),
        LEFT + 4,
        y + 8
      );
    }

    y += height + 7;
  }

  // ====================================================
  // TWO FIELDS
  // ====================================================

  function drawTwoFields(
    leftField,
    rightField
  ) {
    const gap = 6;

    const width =
      (CONTENT_WIDTH - gap) / 2;

    ensureSpace(28);

    doc.setTextColor(...TEXT);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);

    doc.text(
      leftField.label,
      LEFT,
      y
    );

    doc.text(
      rightField.label,
      LEFT + width + gap,
      y
    );

    y += 3;

    doc.setFillColor(...WHITE);

    doc.setDrawColor(...BORDER);

    doc.setLineWidth(0.35);

    doc.roundedRect(
      LEFT,
      y,
      width,
      14,
      2,
      2,
      "FD"
    );

    doc.roundedRect(
      LEFT + width + gap,
      y,
      width,
      14,
      2,
      2,
      "FD"
    );

    doc.setTextColor(...TEXT);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(8);

    doc.text(
      String(
        leftField.value || "-"
      ),
      LEFT + 4,
      y + 8
    );

    doc.text(
      String(
        rightField.value || "-"
      ),
      LEFT + width + gap + 4,
      y + 8
    );

    y += 21;
  }

  // ====================================================
  // CHECKMARK
  // ====================================================

  function drawCheckmark(
    x,
    yPos,
    size = 10
  ) {
    doc.setDrawColor(...WHITE);

    doc.setLineWidth(1.4);

    if (
      typeof doc.setLineCap ===
      "function"
    ) {
      doc.setLineCap("round");
    }

    if (
      typeof doc.setLineJoin ===
      "function"
    ) {
      doc.setLineJoin("round");
    }

    doc.line(
      x + size * 0.2,
      yPos + size * 0.5,
      x + size * 0.42,
      yPos + size * 0.74
    );

    doc.line(
      x + size * 0.42,
      yPos + size * 0.74,
      x + size * 0.82,
      yPos + size * 0.25
    );
  }

  // ====================================================
  // AGREEMENT BOX
  // ====================================================

  function drawAgreementBox(
    title,
    amount,
    accepted
  ) {
    ensureSpace(28);

    doc.setFillColor(
      ...(accepted
        ? GREEN_LIGHT
        : RED_LIGHT)
    );

    doc.setDrawColor(...BORDER);

    doc.setLineWidth(0.4);

    doc.roundedRect(
      LEFT,
      y,
      CONTENT_WIDTH,
      21,
      3,
      3,
      "FD"
    );

    const checkboxX =
      LEFT + 5;

    const checkboxY =
      y + 5;

    const checkboxSize = 10;

    if (accepted) {
      doc.setFillColor(...GREEN);

      doc.setDrawColor(...GREEN);

      doc.roundedRect(
        checkboxX,
        checkboxY,
        checkboxSize,
        checkboxSize,
        1.5,
        1.5,
        "FD"
      );

      drawCheckmark(
        checkboxX,
        checkboxY,
        checkboxSize
      );
    } else {
      doc.setFillColor(...WHITE);

      doc.setDrawColor(...MUTED);

      doc.setLineWidth(0.8);

      doc.roundedRect(
        checkboxX,
        checkboxY,
        checkboxSize,
        checkboxSize,
        1.5,
        1.5,
        "FD"
      );
    }

    doc.setTextColor(...TEXT);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8.5);

    doc.text(
      title,
      LEFT + 20,
      y + 8
    );

    doc.setTextColor(...GREEN);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);

    doc.text(
      String(amount || "-"),
      LEFT + 20,
      y + 14
    );

    doc.setTextColor(...MUTED);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(7);

    doc.text(
      accepted
        ? "Accepted"
        : "Not Accepted",
      RIGHT - 5,
      y + 11,
      {
        align: "right",
      }
    );

    y += 27;
  }

  // ====================================================
  // START PDF
  // ====================================================

  drawPageHeader();

  // ====================================================
  // TITLE
  // ====================================================

  doc.setTextColor(...DARK);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(18);

  doc.text(
    "Event Booking Form",
    PAGE_WIDTH / 2,
    y,
    {
      align: "center",
    }
  );

  doc.setTextColor(...MUTED);

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  doc.text(
    "Completed booking information",
    PAGE_WIDTH / 2,
    y + 6,
    {
      align: "center",
    }
  );

  y += 16;

  // ====================================================
  // EVENT INFORMATION
  // ====================================================

  drawSectionHeading(
    "Event Information",
    "Tell us about your event"
  );

  drawTwoFields(
    {
      label: "Date of Event *",
      value: data.eventDate,
    },
    {
      label: "Event *",
      value: data.event,
    }
  );

  drawField(
    "Event Timing *",
    data.eventTiming
  );

  // ====================================================
  // VENUE CHARGES
  // ====================================================

  drawSectionHeading(
    "Venue Charges",
    "Review the applicable charges and agreements"
  );

  drawAgreementBox(
    "Lawn Rent",
    data.lawnRent,
    data.lawnRentAgreement
  );

  drawAgreementBox(
    "Maintenance Charges",
    data.maintenanceCharges,
    data.maintenanceAgreement
  );

  drawAgreementBox(
    "Advance / Refundable Security",
    data.advanceSecurity,
    data.advanceAgreement
  );

  // ====================================================
  // ROOMS
  // ====================================================

  drawSectionHeading(
    "Rooms",
    "Maximum 2 rooms available. Rs. 5,000 per room."
  );

  drawTwoFields(
    {
      label: "No. of Rooms *",
      value: data.rooms
        ? `${data.rooms} ${
            Number(data.rooms) === 1
              ? "Room"
              : "Rooms"
          }`
        : "-",
    },
    {
      label: "Room Charges",
      value:
        data.roomCharges ||
        "Rs. 0/-",
    }
  );

  // ====================================================
  // CLIENT INFORMATION
  // ====================================================

  drawSectionHeading(
    "Client Information",
    "Personal and contact information"
  );

  drawField(
    "Name of Client & Designation / C/o *",
    data.clientName
  );

  drawTwoFields(
    {
      label: "C.N.I. No. *",
      value: data.cnic,
    },
    {
      label: "Contact No. *",
      value: data.contactNo,
    }
  );

  drawField(
    "Address *",
    data.address,
    {
      height: 28,
      multiline: true,
    }
  );

  // ====================================================
  // TERMS
  // ====================================================

  drawSectionHeading(
    "Terms & Conditions",
    "Applicant confirmation"
  );

  drawAgreementBox(
    "I have read and accepted all terms and conditions",
    data.termsAccepted
      ? "Accepted"
      : "Not Accepted",
    data.termsAccepted
  );

  // ====================================================
  // FINAL BOX
  // ====================================================

  ensureSpace(35);

  doc.setFillColor(...GREEN);

  doc.roundedRect(
    LEFT,
    y,
    CONTENT_WIDTH,
    27,
    4,
    4,
    "F"
  );

  doc.setTextColor(...WHITE);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(11);

  doc.text(
    "Booking Request Completed",
    PAGE_WIDTH / 2,
    y + 10,
    {
      align: "center",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(7.5);

  doc.text(
    "The information above has been submitted to Punjab House.",
    PAGE_WIDTH / 2,
    y + 17,
    {
      align: "center",
    }
  );

  drawFooter();

  return doc.output("arraybuffer");
}

// ======================================================
// VALIDATE BOOKING
// ======================================================

function validateBooking(data) {
  if (
    !data ||
    typeof data !== "object"
  ) {
    return "Invalid booking data.";
  }

  if (!data.eventDate) {
    return "Event date is required.";
  }

  if (!data.event) {
    return "Event type is required.";
  }

  if (!data.eventTiming) {
    return "Event timing is required.";
  }

  if (!data.lawnRentAgreement) {
    return "Lawn Rent agreement is required.";
  }

  if (!data.maintenanceAgreement) {
    return "Maintenance Charges agreement is required.";
  }

  if (!data.advanceAgreement) {
    return "Advance Security agreement is required.";
  }

  if (
    !["1", "2"].includes(
      String(data.rooms)
    )
  ) {
    return "Please select 1 or 2 rooms.";
  }

  if (
    !data.clientName ||
    typeof data.clientName !== "string" ||
    !data.clientName.trim()
  ) {
    return "Client name is required.";
  }

  const cnicRegex =
    /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

  if (
    !cnicRegex.test(
      String(data.cnic || "")
    )
  ) {
    return "Invalid CNIC format. Use 00000-0000000-0.";
  }

  const phone =
    String(data.contactNo || "")
      .replace(/[\s-]/g, "");

  const phoneRegex =
    /^[0-9]{10,15}$/;

  if (!phoneRegex.test(phone)) {
    return "Invalid contact number.";
  }

  if (
    !data.address ||
    typeof data.address !== "string" ||
    data.address.trim().length < 10
  ) {
    return "Complete address is required.";
  }

  if (!data.termsAccepted) {
    return "Terms and conditions must be accepted.";
  }

  return null;
}

// ======================================================
// CREATE EMAIL HTML
// ======================================================

function createEmailHTML(data) {
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>Punjab House Booking</title>

</head>

<body style="
margin:0;
padding:0;
background:#f8fafc;
font-family:Arial,sans-serif;
">

<div style="
max-width:700px;
margin:30px auto;
background:#ffffff;
border-radius:18px;
overflow:hidden;
border:1px solid #e2e8f0;
">

<div style="
background:#0f172a;
padding:30px;
text-align:center;
">

<h1 style="
margin:0;
color:#ffffff;
font-size:28px;
">
Punjab House
</h1>

<p style="
margin:8px 0 0;
color:#00c874;
font-size:12px;
font-weight:bold;
letter-spacing:2px;
">
NEW BOOKING REQUEST
</p>

</div>

<div style="
padding:30px;
">

<h2 style="
margin-top:0;
color:#0f172a;
">
Booking Details
</h2>

<table style="
width:100%;
border-collapse:collapse;
">

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Client Name
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.clientName)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Event Date
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.eventDate)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Event
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.event)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Event Timing
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.eventTiming)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Lawn Rent
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.lawnRent)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Lawn Rent Agreement
</td>
<td style="padding:9px 0;color:#0f172a;">
${data.lawnRentAgreement
  ? "Accepted"
  : "Not Accepted"}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Maintenance Charges
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.maintenanceCharges)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Maintenance Agreement
</td>
<td style="padding:9px 0;color:#0f172a;">
${data.maintenanceAgreement
  ? "Accepted"
  : "Not Accepted"}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Advance Security
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.advanceSecurity)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Advance Agreement
</td>
<td style="padding:9px 0;color:#0f172a;">
${data.advanceAgreement
  ? "Accepted"
  : "Not Accepted"}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Rooms
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.rooms)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Room Charges
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(
  data.roomCharges || "Rs. 0/-"
)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
CNIC
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.cnic)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Contact No.
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.contactNo)}
</td>
</tr>

<tr>
<td style="padding:9px 0;color:#64748b;font-weight:bold;">
Address
</td>
<td style="padding:9px 0;color:#0f172a;">
${escapeHTML(data.address)}
</td>
</tr>

</table>

<div style="
margin-top:24px;
padding:18px;
border-radius:12px;
background:#ecfdf5;
border:1px solid #bbf7d0;
">

<strong style="
color:#047857;
">
Completed Booking Form Attached
</strong>

<p style="
margin:7px 0 0;
color:#64748b;
font-size:14px;
">
The complete filled booking form is attached
to this email as a PDF.
</p>

</div>

</div>

<div style="
padding:18px 30px;
background:#f8fafc;
border-top:1px solid #e2e8f0;
text-align:center;
color:#64748b;
font-size:12px;
">

Punjab House Karachi |
GOR-1, Bath Island, Clifton, Karachi

</div>

</div>

</body>

</html>
`;
}

// ======================================================
// SEND BOOKING EMAIL
// ======================================================

async function sendBookingEmail(
  data,
  pdfBuffer,
  fileName
) {
  if (!transporter) {
    throw new Error(
      "Email transporter is not configured."
    );
  }

  if (!process.env.GMAIL_USER) {
    throw new Error(
      "GMAIL_USER is missing."
    );
  }

  if (!process.env.ADMIN_EMAIL) {
    throw new Error(
      "ADMIN_EMAIL is missing."
    );
  }

  const mailOptions = {
    from:
      `"Punjab House Website" <${process.env.GMAIL_USER}>`,

    to:
      process.env.ADMIN_EMAIL,

    subject:
      `New Punjab House Booking - ${data.clientName}`,

    text: `
New Punjab House Booking

Client Name:
${data.clientName}

Event Date:
${data.eventDate}

Event:
${data.event}

Event Timing:
${data.eventTiming}

Lawn Rent:
${data.lawnRent}

Maintenance Charges:
${data.maintenanceCharges}

Advance Security:
${data.advanceSecurity}

Rooms:
${data.rooms}

Room Charges:
${data.roomCharges || "Rs. 0/-"}

CNIC:
${data.cnic}

Contact:
${data.contactNo}

Address:
${data.address}
`,

    html:
      createEmailHTML(data),

    attachments: [
      {
        filename: fileName,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  return transporter.sendMail(
    mailOptions
  );
}

// ======================================================
// BOOKING ROUTE
// ======================================================

app.post(
  "/api/bookings",
  async (req, res) => {
    console.log(
      "======================================"
    );

    console.log(
      "📩 New booking request received."
    );

    console.log(
      "======================================"
    );

    try {
      const data = req.body;

      // ----------------------------------------------
      // VALIDATION
      // ----------------------------------------------

      const validationError =
        validateBooking(data);

      if (validationError) {
        console.log(
          "❌ Validation:",
          validationError
        );

        return res.status(400).json({
          success: false,
          message: validationError,
        });
      }

      // ----------------------------------------------
      // EMAIL CONFIGURATION
      // ----------------------------------------------

      if (
        !process.env.GMAIL_USER ||
        !process.env.GMAIL_APP_PASSWORD ||
        !process.env.ADMIN_EMAIL
      ) {
        console.error(
          "❌ Email environment variables are missing."
        );

        return res.status(500).json({
          success: false,
          message:
            "Email configuration is missing on Railway.",
        });
      }

      // ----------------------------------------------
      // GENERATE PDF
      // ----------------------------------------------

      console.log(
        "📄 Generating booking PDF..."
      );

      const pdfArrayBuffer =
        generateBookingPDF(data);

      const pdfBuffer =
        Buffer.from(pdfArrayBuffer);

      console.log(
        "✅ PDF generated."
      );

      // ----------------------------------------------
      // SAFE FILE NAME
      // ----------------------------------------------

      const safeName =
        String(data.clientName)
          .replace(
            /[^a-z0-9]/gi,
            "_"
          )
          .substring(
            0,
            40
          ) ||
        "Client";

      const fileName =
        `PunjabHouse-Booking-${safeName}.pdf`;

      // ----------------------------------------------
      // SEND EMAIL
      // ----------------------------------------------

      console.log(
        "📧 Sending booking email..."
      );

      try {
        await sendBookingEmail(
          data,
          pdfBuffer,
          fileName
        );

        console.log(
          "✅ Booking email sent successfully."
        );
      } catch (emailError) {
        console.error(
          "❌ EMAIL SEND FAILED"
        );

        console.error(
          "Code:",
          emailError.code || "UNKNOWN"
        );

        console.error(
          "Message:",
          emailError.message ||
            "Unknown error"
        );

        return res.status(503).json({
          success: false,

          message:
            "Booking was received, but the email service is currently unavailable. Please try again later.",

          error:
            process.env.NODE_ENV ===
            "production"
              ? undefined
              : emailError.message,
        });
      }

      console.log(
        "======================================"
      );

      return res.status(200).json({
        success: true,

        message:
          "Booking submitted successfully.",
      });

    } catch (error) {
      console.error(
        "❌ Booking submission error:"
      );

      console.error(error);

      return res.status(500).json({
        success: false,

        message:
          "Unable to process booking.",

        error:
          process.env.NODE_ENV ===
          "production"
            ? undefined
            : error.message,
      });
    }
  }
);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get(
  "/",
  (req, res) => {
    return res.status(200).json({
      success: true,

      message:
        "Punjab House Booking API is running.",

      status: "online",

      railway:
        RAILWAY_URL,

      emailConfigured:
        Boolean(
          process.env.GMAIL_USER &&
          process.env.GMAIL_APP_PASSWORD &&
          process.env.ADMIN_EMAIL
        ),

      port: PORT,
    });
  }
);

// ======================================================
// EMAIL STATUS
// ======================================================

app.get(
  "/api/email-status",
  async (req, res) => {
    if (!transporter) {
      return res.status(503).json({
        success: false,

        emailConfigured: false,

        message:
          "Email transporter is not configured.",
      });
    }

    try {
      await transporter.verify();

      return res.status(200).json({
        success: true,

        emailConfigured: true,

        smtp:
          "Gmail SMTP is reachable.",

        message:
          "Email service is working.",
      });

    } catch (error) {
      console.error(
        "❌ Email status check failed:",
        error.message
      );

      return res.status(503).json({
        success: false,

        emailConfigured: true,

        smtp:
          "Gmail SMTP is not reachable.",

        code:
          error.code || "UNKNOWN",

        message:
          error.message ||
          "SMTP connection failed.",
      });
    }
  }
);

// ======================================================
// 404 HANDLER
// ======================================================

app.use(
  (req, res) => {
    return res.status(404).json({
      success: false,

      message:
        `Cannot ${req.method} ${req.originalUrl}`,
    });
  }
);

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "❌ Global server error:",
      error
    );

    if (res.headersSent) {
      return next(error);
    }

    return res.status(500).json({
      success: false,

      message:
        "Internal server error.",
    });
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      "======================================"
    );

    console.log(
      "🚀 Punjab House API started"
    );

    console.log(
      `🌐 Railway URL: ${RAILWAY_URL}`
    );

    console.log(
      `🚀 Server running on port ${PORT}`
    );

    console.log(
      `🌐 Listening on 0.0.0.0:${PORT}`
    );

    console.log(
      "======================================"
    );

    // Do not block server startup
    // while checking Gmail.
    verifyEmail();
  }
);