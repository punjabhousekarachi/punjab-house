const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { jsPDF } = require("jspdf");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================================
// CORS
// ======================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST"],
  })
);

// ======================================================
// JSON
// ======================================================

app.use(
  express.json({
    limit: "2mb",
  })
);

// ======================================================
// GMAIL
// ======================================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ======================================================
// VERIFY GMAIL
// ======================================================

async function verifyEmail() {
  try {
    await transporter.verify();

    console.log("✅ Gmail connection successful.");
  } catch (error) {
    console.error(
      "❌ Gmail connection failed:",
      error.message
    );
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
  const CONTENT_WIDTH = RIGHT - LEFT;

  let y = 15;

  // =====================================================
  // HEADER
  // =====================================================

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

    // Punjab House name
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

    // Right side heading
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

  // =====================================================
  // FOOTER
  // =====================================================

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

  // =====================================================
  // NEW PAGE
  // =====================================================

  function addNewPage() {
    drawFooter();

    doc.addPage();

    drawPageHeader();
  }

  // =====================================================
  // SPACE CHECK
  // =====================================================

  function ensureSpace(
    height = 20
  ) {
    if (
      y + height >
      270
    ) {
      addNewPage();
    }
  }

  // =====================================================
  // SECTION HEADER
  // =====================================================

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

  // =====================================================
  // SINGLE FIELD
  // =====================================================

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

    ensureSpace(
      height + 7
    );

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

    // Field background
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
      value ||
      " ";

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

    y +=
      height + 7;
  }

  // =====================================================
  // TWO FIELDS
  // =====================================================

  function drawTwoFields(
    leftField,
    rightField
  ) {
    const gap = 6;

    const width =
      (CONTENT_WIDTH - gap) /
      2;

    ensureSpace(28);

    doc.setTextColor(...TEXT);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);

    // Left label
    doc.text(
      leftField.label,
      LEFT,
      y
    );

    // Right label
    doc.text(
      rightField.label,
      LEFT + width + gap,
      y
    );

    y += 3;

    doc.setFillColor(...WHITE);
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.35);

    // Left field
    doc.roundedRect(
      LEFT,
      y,
      width,
      14,
      2,
      2,
      "FD"
    );

    // Right field
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

  // =====================================================
  // DRAW CHECKMARK
  // =====================================================

  function drawCheckmark(
    x,
    yPos,
    size = 10
  ) {
    doc.setDrawColor(...WHITE);

    // Make it thick and rounded
    doc.setLineWidth(1.4);

    if (
      typeof doc.setLineCap === "function"
    ) {
      doc.setLineCap("round");
    }

    if (
      typeof doc.setLineJoin === "function"
    ) {
      doc.setLineJoin("round");
    }

    // First stroke
    doc.line(
      x + size * 0.20,
      yPos + size * 0.50,
      x + size * 0.42,
      yPos + size * 0.74
    );

    // Second stroke
    doc.line(
      x + size * 0.42,
      yPos + size * 0.74,
      x + size * 0.82,
      yPos + size * 0.25
    );
  }

  // =====================================================
  // AGREEMENT BOX
  // =====================================================

  function drawAgreementBox(
    title,
    amount,
    accepted
  ) {
    ensureSpace(28);

    // Background
    if (accepted) {
      doc.setFillColor(
        ...GREEN_LIGHT
      );
    } else {
      doc.setFillColor(
        ...RED_LIGHT
      );
    }

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

    // Checkbox coordinates
    const checkboxX =
      LEFT + 5;

    const checkboxY =
      y + 5;

    const checkboxSize =
      10;

    // ===================================================
    // CHECKBOX
    // ===================================================

    if (accepted) {
      // Filled green square
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

      // White manually drawn tick
      drawCheckmark(
        checkboxX,
        checkboxY,
        checkboxSize
      );
    } else {
      // Empty checkbox
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

    // ===================================================
    // TITLE
    // ===================================================

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

    // ===================================================
    // AMOUNT
    // ===================================================

    doc.setTextColor(...GREEN);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);

    doc.text(
      amount,
      LEFT + 20,
      y + 14
    );

    // ===================================================
    // STATUS
    // ===================================================

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

  // =====================================================
  // BEGIN PDF
  // =====================================================

  drawPageHeader();

  // =====================================================
  // MAIN TITLE
  // =====================================================

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

  // =====================================================
  // EVENT INFORMATION
  // =====================================================

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

  // =====================================================
  // VENUE CHARGES
  // =====================================================

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

  // =====================================================
  // ROOMS
  // =====================================================

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

  // =====================================================
  // CLIENT INFORMATION
  // =====================================================

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

  // =====================================================
  // TERMS
  // =====================================================

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

  // =====================================================
  // FINAL BOX
  // =====================================================

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

  // Return PDF as ArrayBuffer
  return doc.output(
    "arraybuffer"
  );
}

// ======================================================
// BOOKING ROUTE
// ======================================================

app.post(
  "/api/bookings",
  async (req, res) => {
    try {
      const data = req.body;

      // --------------------------------------------------
      // SERVER VALIDATION
      // --------------------------------------------------

      if (!data.eventDate) {
        return res.status(400).json({
          message:
            "Event date is required.",
        });
      }

      if (!data.event) {
        return res.status(400).json({
          message:
            "Event type is required.",
        });
      }

      if (!data.eventTiming) {
        return res.status(400).json({
          message:
            "Event timing is required.",
        });
      }

      if (!data.lawnRentAgreement) {
        return res.status(400).json({
          message:
            "Lawn Rent agreement is required.",
        });
      }

      if (!data.maintenanceAgreement) {
        return res.status(400).json({
          message:
            "Maintenance Charges agreement is required.",
        });
      }

      if (!data.advanceAgreement) {
        return res.status(400).json({
          message:
            "Advance Security agreement is required.",
        });
      }

      if (
        !["1", "2"].includes(
          String(data.rooms)
        )
      ) {
        return res.status(400).json({
          message:
            "Please select 1 or 2 rooms.",
        });
      }

      if (!data.clientName) {
        return res.status(400).json({
          message:
            "Client name is required.",
        });
      }

      const cnicRegex =
        /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

      if (
        !cnicRegex.test(
          data.cnic
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid CNIC format.",
        });
      }

      const phoneRegex =
        /^[0-9]{10,15}$/;

      if (
        !phoneRegex.test(
          data.contactNo
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid contact number.",
        });
      }

      if (
        !data.address ||
        data.address.trim().length <
          10
      ) {
        return res.status(400).json({
          message:
            "Complete address is required.",
        });
      }

      if (!data.termsAccepted) {
        return res.status(400).json({
          message:
            "Terms and conditions must be accepted.",
        });
      }

      // --------------------------------------------------
      // GENERATE PDF
      // --------------------------------------------------

      const pdfArrayBuffer =
        generateBookingPDF(data);

      const pdfBuffer =
        Buffer.from(
          pdfArrayBuffer
        );

      const safeName =
        String(data.clientName)
          .replace(
            /[^a-z0-9]/gi,
            "_"
          )
          .substring(0, 40) ||
        "Client";

      const fileName =
        `PunjabHouse-Booking-${safeName}.pdf`;

      // --------------------------------------------------
      // EMAIL HTML
      // --------------------------------------------------

      const emailHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>

<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">

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
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          Client Name
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.clientName
          )}
        </td>
      </tr>

      <tr>
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          Event Date
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.eventDate
          )}
        </td>
      </tr>

      <tr>
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          Event
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.event
          )}
        </td>
      </tr>

      <tr>
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          Event Timing
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.eventTiming
          )}
        </td>
      </tr>

      <tr>
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          Contact No.
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.contactNo
          )}
        </td>
      </tr>

      <tr>
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          CNIC
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.cnic
          )}
        </td>
      </tr>

      <tr>
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          Rooms
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.rooms
          )}
        </td>
      </tr>

      <tr>
        <td style="
          padding:9px 0;
          color:#64748b;
          font-weight:bold;
        ">
          Room Charges
        </td>

        <td style="
          padding:9px 0;
          color:#0f172a;
        ">
          ${escapeHTML(
            data.roomCharges ||
              "Rs. 0/-"
          )}
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

      // --------------------------------------------------
      // SEND EMAIL
      // --------------------------------------------------

      await transporter.sendMail({
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
${data.roomCharges}

CNIC:
${data.cnic}

Contact:
${data.contactNo}

Address:
${data.address}
`,

        html: emailHTML,

        attachments: [
          {
            filename: fileName,
            content: pdfBuffer,
            contentType:
              "application/pdf",
          },
        ],
      });

      console.log(
        "✅ Booking email sent successfully."
      );

      return res.status(200).json({
        success: true,
        message:
          "Booking submitted successfully.",
      });

    } catch (error) {
      console.error(
        "❌ Booking submission error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to process booking.",
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
    res.json({
      success: true,
      message:
        "Punjab House Booking API is running.",
    });
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  async () => {
    console.log(
      `🚀 Server running at http://localhost:${PORT}`
    );

    await verifyEmail();
  }
);