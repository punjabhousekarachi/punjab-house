const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");
const { jsPDF } = require("jspdf");

// ======================================================
// ENVIRONMENT
// ======================================================

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================================
// FRONTEND
// ======================================================

const FRONTEND_URL =
  "https://punjab-house-karachi.netlify.app";

// ======================================================
// CORS
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin
      // such as Postman or server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("⚠️ CORS blocked:", origin);

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    methods: ["GET", "POST", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
    ],

    credentials: false,
  })
);

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
// RESEND
// ======================================================

let resend = null;

if (process.env.RESEND_API_KEY) {
  resend = new Resend(
    process.env.RESEND_API_KEY
  );

  console.log(
    "📧 Resend email service initialized."
  );
} else {
  console.error(
    "❌ RESEND_API_KEY is missing."
  );
}

// ======================================================
// ENVIRONMENT STATUS
// ======================================================

console.log("======================================");
console.log(
  "Punjab House Karachi Booking API"
);
console.log("======================================");

console.log(
  "RESEND_API_KEY:",
  process.env.RESEND_API_KEY
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

console.log(
  "FRONTEND:",
  FRONTEND_URL
);

console.log("======================================");

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

  const GREEN = [0, 200, 116];
  const DARK = [15, 23, 42];
  const TEXT = [30, 41, 59];
  const MUTED = [100, 116, 139];
  const BORDER = [203, 213, 225];
  const LIGHT = [248, 250, 252];
  const GREEN_LIGHT = [236, 253, 245];
  const RED_LIGHT = [255, 247, 247];
  const WHITE = [255, 255, 255];

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

    // Logo circle
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
  // SPACE
  // ====================================================

  function ensureSpace(height = 20) {
    if (y + height > 270) {
      addNewPage();
    }
  }

  // ====================================================
  // SECTION HEADING
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
  // FIELD
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
      LEFT +
        width +
        gap +
        4,
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

  // Lawn Rent
  drawAgreementBox(
    "Lawn Rent",
    data.lawnRent,
    data.lawnRentAgreement
  );

  // Advance Security
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
      value: `${data.rooms} ${
        Number(data.rooms) === 1
          ? "Room"
          : "Rooms"
      }`,
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
    "Accepted",
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

  // ====================================================
  // LAWN RENT AGREEMENT
  // ====================================================

  if (!data.lawnRentAgreement) {
    return "Lawn Rent agreement is required.";
  }

  // ====================================================
  // ADVANCE SECURITY AGREEMENT
  // ====================================================

  if (!data.advanceAgreement) {
    return "Advance Security agreement is required.";
  }

  // ====================================================
  // ROOMS
  // ====================================================

  if (
    !["1", "2"].includes(
      String(data.rooms)
    )
  ) {
    return "Please select 1 or 2 rooms.";
  }

  // ====================================================
  // CLIENT NAME
  // ====================================================

  if (
    !data.clientName ||
    typeof data.clientName !== "string" ||
    !data.clientName.trim()
  ) {
    return "Client name is required.";
  }

  if (
    data.clientName.trim().length < 2
  ) {
    return "Client name must contain at least 2 characters.";
  }

  // ====================================================
  // CNIC
  // ====================================================

  const cnicRegex =
    /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

  if (
    !cnicRegex.test(
      String(data.cnic || "")
    )
  ) {
    return "Invalid CNIC format. Use 00000-0000000-0.";
  }

  // ====================================================
  // PHONE
  // ====================================================

  const phone =
    String(data.contactNo || "")
      .replace(/[\s-]/g, "");

  const phoneRegex =
    /^[0-9]{10,15}$/;

  if (!phoneRegex.test(phone)) {
    return "Invalid contact number.";
  }

  // ====================================================
  // ADDRESS
  // ====================================================

  if (
    !data.address ||
    typeof data.address !== "string" ||
    data.address.trim().length < 10
  ) {
    return "Complete address is required.";
  }

  // ====================================================
  // TERMS
  // ====================================================

  if (!data.termsAccepted) {
    return "Terms and conditions must be accepted.";
  }

  return null;
}

// ======================================================
// EMAIL HTML
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

<div style="padding:30px;">

<h2 style="color:#0f172a;">
Booking Details
</h2>

<table style="
width:100%;
border-collapse:collapse;
">

${[
  [
    "Client Name",
    data.clientName,
  ],

  [
    "Event Date",
    data.eventDate,
  ],

  [
    "Event",
    data.event,
  ],

  [
    "Event Timing",
    data.eventTiming,
  ],

  [
    "Lawn Rent",
    data.lawnRent,
  ],

  [
    "Lawn Rent Agreement",
    data.lawnRentAgreement
      ? "Accepted"
      : "Not Accepted",
  ],

  [
    "Advance Security",
    data.advanceSecurity,
  ],

  [
    "Advance Agreement",
    data.advanceAgreement
      ? "Accepted"
      : "Not Accepted",
  ],

  [
    "Rooms",
    data.rooms,
  ],

  [
    "Room Charges",
    data.roomCharges ||
      "Rs. 0/-",
  ],

  [
    "CNIC",
    data.cnic,
  ],

  [
    "Contact No.",
    data.contactNo,
  ],

  [
    "Address",
    data.address,
  ],

  [
    "Terms & Conditions",
    data.termsAccepted
      ? "Accepted"
      : "Not Accepted",
  ],
]
  .map(
    ([label, value]) => `
<tr>

<td style="
padding:9px 0;
color:#64748b;
font-weight:bold;
vertical-align:top;
">

${escapeHTML(label)}

</td>

<td style="
padding:9px 0;
color:#0f172a;
">

${escapeHTML(value)}

</td>

</tr>
`
  )
  .join("")}

</table>

<div style="
margin-top:24px;
padding:18px;
border-radius:12px;
background:#ecfdf5;
border:1px solid #bbf7d0;
">

<strong style="color:#047857;">
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
// SEND BOOKING EMAIL USING RESEND
// ======================================================

async function sendBookingEmail(
  data,
  pdfBuffer,
  fileName
) {
  if (!resend) {
    throw new Error(
      "Resend is not configured. RESEND_API_KEY is missing."
    );
  }

  if (!process.env.ADMIN_EMAIL) {
    throw new Error(
      "ADMIN_EMAIL is missing."
    );
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "onboarding@resend.dev";

  console.log(
    "📧 Sending booking email with Resend..."
  );

  console.log(
    "From:",
    fromEmail
  );

  console.log(
    "To:",
    process.env.ADMIN_EMAIL
  );

  const result =
    await resend.emails.send({
      from: fromEmail,

      to: [
        process.env.ADMIN_EMAIL,
      ],

      subject:
        `New Punjab House Booking - ${data.clientName}`,

      text: `
New Punjab House Booking

Client Name: ${data.clientName}

Event Date: ${data.eventDate}

Event: ${data.event}

Event Timing: ${data.eventTiming}

Lawn Rent: ${data.lawnRent}

Lawn Rent Agreement:
${
  data.lawnRentAgreement
    ? "Accepted"
    : "Not Accepted"
}

Advance Security:
${data.advanceSecurity}

Advance Security Agreement:
${
  data.advanceAgreement
    ? "Accepted"
    : "Not Accepted"
}

Rooms: ${data.rooms}

Room Charges:
${
  data.roomCharges ||
  "Rs. 0/-"
}

CNIC: ${data.cnic}

Contact:
${data.contactNo}

Address:
${data.address}

Terms & Conditions:
${
  data.termsAccepted
    ? "Accepted"
    : "Not Accepted"
}
`,

      html: createEmailHTML(data),

      attachments: [
        {
          filename: fileName,

          content:
            pdfBuffer.toString(
              "base64"
            ),
        },
      ],
    });

  if (result.error) {
    console.error(
      "❌ Resend API error:",
      result.error
    );

    throw new Error(
      result.error.message ||
        "Resend failed to send email."
    );
  }

  console.log(
    "✅ Resend email sent."
  );

  console.log(
    "Email ID:",
    result.data?.id || "N/A"
  );

  return result.data;
}

// ======================================================
// BOOKING API
// ======================================================

app.post(
  "/api/bookings",
  async (req, res) => {
    console.log(
      "======================================"
    );

    console.log(
      "📩 NEW BOOKING REQUEST"
    );

    console.log(
      "======================================"
    );

    try {
      const data = req.body;

      // ==================================================
      // VALIDATE
      // ==================================================

      const validationError =
        validateBooking(data);

      if (validationError) {
        console.log(
          "❌ Validation:",
          validationError
        );

        return res.status(400).json({
          success: false,
          message:
            validationError,
        });
      }

      // ==================================================
      // CHECK RESEND
      // ==================================================

      if (
        !process.env.RESEND_API_KEY
      ) {
        console.error(
          "❌ RESEND_API_KEY is missing."
        );

        return res.status(500).json({
          success: false,
          message:
            "Email service is not configured on Railway.",
        });
      }

      // ==================================================
      // CHECK ADMIN EMAIL
      // ==================================================

      if (
        !process.env.ADMIN_EMAIL
      ) {
        console.error(
          "❌ ADMIN_EMAIL is missing."
        );

        return res.status(500).json({
          success: false,
          message:
            "Admin email is not configured on Railway.",
        });
      }

      // ==================================================
      // GENERATE PDF
      // ==================================================

      console.log(
        "📄 Generating PDF..."
      );

      const pdfArrayBuffer =
        generateBookingPDF(data);

      const pdfBuffer =
        Buffer.from(
          pdfArrayBuffer
        );

      console.log(
        "✅ PDF generated."
      );

      // ==================================================
      // SAFE FILE NAME
      // ==================================================

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

      // ==================================================
      // SEND EMAIL
      // ==================================================

      await sendBookingEmail(
        data,
        pdfBuffer,
        fileName
      );

      console.log(
        "✅ Booking email sent successfully."
      );

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
        "======================================"
      );

      console.error(
        "❌ BOOKING ERROR"
      );

      console.error(
        "Code:",
        error.code ||
          "UNKNOWN"
      );

      console.error(
        "Message:",
        error.message ||
          "Unknown error"
      );

      console.error(
        "Full error:",
        error
      );

      console.error(
        "======================================"
      );

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

      emailProvider:
        "Resend",

      emailConfigured:
        Boolean(
          process.env.RESEND_API_KEY &&
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
    const configured =
      Boolean(
        process.env.RESEND_API_KEY &&
        process.env.ADMIN_EMAIL
      );

    if (!configured) {
      return res.status(503).json({
        success: false,

        emailConfigured: false,

        provider: "Resend",

        message:
          "Resend email service is not configured.",
      });
    }

    return res.status(200).json({
      success: true,

      emailConfigured: true,

      provider: "Resend",

      message:
        "Resend email service is configured.",
    });
  }
);

// ======================================================
// 404
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
// GLOBAL ERROR
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
      `🚀 Punjab House API running on port ${PORT}`
    );

    console.log(
      "🌐 Railway server listening on 0.0.0.0"
    );

    console.log(
      `🌍 Frontend: ${FRONTEND_URL}`
    );

    console.log(
      "📧 Email provider: Resend"
    );

    console.log(
      "======================================"
    );
  }
);