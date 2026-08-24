import React, { useState } from "react";
import {
  Calendar,
  Clock,
  DoorOpen,
  User,
  CreditCard,
  MapPin,
  Phone,
  CheckCircle2,
  Send,
  Loader2,
  FileText,
} from "lucide-react";

// =========================================================
// LIVE BACKEND - RAILWAY
// =========================================================

const API_URL =
  "https://punjab-house-production.up.railway.app";

// =========================================================
// INITIAL FORM
// =========================================================

const initialForm = {
  eventDate: "",
  event: "",
  eventTiming: "07:00 PM - 11:30 PM",

  lawnRent: "Rs. 500,000/-",
  lawnRentAgreement: false,

  maintenanceCharges: "Rs. 500,000/-",
  maintenanceAgreement: false,

  advanceSecurity: "Rs. 100,000/-",
  advanceAgreement: false,

  rooms: "",
  roomCharges: "",

  clientName: "",
  cnic: "",
  address: "",
  contactNo: "",

  termsAccepted: false,
};

// =========================================================
// EVENT TYPES
// =========================================================

const eventTypes = [
  "Wedding",
  "Reception / Walima",
  "Nikah Ceremony",
  "Corporate Event",
  "Family Gathering",
  "Other",
];

export default function BookNow() {
  const [form, setForm] = useState(initialForm);

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  // =======================================================
  // TODAY'S DATE
  // =======================================================

  const today = new Date().toISOString().split("T")[0];

  // =======================================================
  // UPDATE FIELD
  // =======================================================

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =======================================================
  // ROOM CHARGES
  // =======================================================

  const calculateRoomCharges = (rooms) => {
    const count = Number(rooms);

    if (!count || count < 1) {
      return "";
    }

    return `Rs. ${(count * 5000).toLocaleString()}/-`;
  };

  const handleRoomsChange = (value) => {
    updateField("rooms", value);

    updateField(
      "roomCharges",
      calculateRoomCharges(value)
    );
  };

  // =======================================================
  // CLIENT NAME
  // Allows normal name/designation characters
  // =======================================================

  const handleClientNameChange = (value) => {
    const cleaned = value.replace(
      /[^a-zA-Z\s.,/&'()-]/g,
      ""
    );

    updateField("clientName", cleaned);
  };

  // =======================================================
  // CNIC
  // Automatically formats:
  // 4210112345671
  // →
  // 42101-1234567-1
  // =======================================================

  const handleCNICChange = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 13) {
      cleaned = cleaned.slice(0, 13);
    }

    let formatted = cleaned;

    if (
      cleaned.length > 5 &&
      cleaned.length <= 12
    ) {
      formatted =
        cleaned.slice(0, 5) +
        "-" +
        cleaned.slice(5);
    }

    if (cleaned.length > 12) {
      formatted =
        cleaned.slice(0, 5) +
        "-" +
        cleaned.slice(5, 12) +
        "-" +
        cleaned.slice(12);
    }

    updateField("cnic", formatted);
  };

  // =======================================================
  // CONTACT NUMBER
  // NUMBERS ONLY
  // =======================================================

  const handlePhoneChange = (value) => {
    const numbersOnly = value.replace(
      /[^0-9]/g,
      ""
    );

    updateField("contactNo", numbersOnly);
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // -----------------------------------------------------
    // DATE
    // -----------------------------------------------------

    if (!form.eventDate) {
      setError(
        "Please select the event date."
      );
      return;
    }

    if (form.eventDate < today) {
      setError(
        "Please select today or a future event date."
      );
      return;
    }

    // -----------------------------------------------------
    // EVENT
    // -----------------------------------------------------

    if (!form.event) {
      setError(
        "Please select an event type."
      );
      return;
    }

    // -----------------------------------------------------
    // EVENT TIMING
    // -----------------------------------------------------

    if (!form.eventTiming.trim()) {
      setError(
        "Please enter the event timing."
      );
      return;
    }

    // -----------------------------------------------------
    // AGREEMENTS
    // -----------------------------------------------------

    if (!form.lawnRentAgreement) {
      setError(
        "Please accept the Lawn Rent agreement."
      );
      return;
    }

    if (!form.maintenanceAgreement) {
      setError(
        "Please accept the Maintenance Charges agreement."
      );
      return;
    }

    if (!form.advanceAgreement) {
      setError(
        "Please accept the Advance Security agreement."
      );
      return;
    }

    // -----------------------------------------------------
    // ROOMS
    // -----------------------------------------------------

    if (!form.rooms) {
      setError(
        "Please select the number of rooms."
      );
      return;
    }

    // -----------------------------------------------------
    // CLIENT NAME
    // -----------------------------------------------------

    if (!form.clientName.trim()) {
      setError(
        "Please enter the client name."
      );
      return;
    }

    if (
      form.clientName.trim().length < 2
    ) {
      setError(
        "Client name must contain at least 2 characters."
      );
      return;
    }

    // -----------------------------------------------------
    // CNIC
    // -----------------------------------------------------

    const cnicRegex =
      /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

    if (!cnicRegex.test(form.cnic)) {
      setError(
        "Please enter a valid CNIC, for example 42101-1234567-1."
      );
      return;
    }

    // -----------------------------------------------------
    // CONTACT NUMBER
    // -----------------------------------------------------

    const phoneRegex =
      /^[0-9]{10,15}$/;

    if (!phoneRegex.test(form.contactNo)) {
      setError(
        "Please enter a valid contact number using numbers only."
      );
      return;
    }

    // -----------------------------------------------------
    // ADDRESS
    // -----------------------------------------------------

    if (
      form.address.trim().length < 10
    ) {
      setError(
        "Please enter your complete address."
      );
      return;
    }

    // -----------------------------------------------------
    // TERMS
    // -----------------------------------------------------

    if (!form.termsAccepted) {
      setError(
        "Please accept the terms and conditions before submitting."
      );
      return;
    }

    // -----------------------------------------------------
    // SUBMITTING
    // -----------------------------------------------------

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Booking submission failed."
        );
      }

      // Successful booking
      setSuccess(true);

      setForm(initialForm);

      setError("");
    } catch (err) {
      console.error(
        "Booking submission error:",
        err
      );

      setError(
        err.message ||
          "Unable to submit booking. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =======================================================
  // INPUT STYLES
  // =======================================================

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00c874] focus:ring-2 focus:ring-[#00c874]/20";

  const agreementClass =
    "flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 cursor-pointer hover:border-[#00c874]/50 transition";

  // =======================================================
  // SUCCESS SCREEN
  // =======================================================

  if (success) {
    return (
      <section className="min-h-screen bg-slate-50 py-24 px-5">
        <div
          className="
            max-w-2xl
            mx-auto
            bg-white
            rounded-3xl
            shadow-xl
            p-10
            text-center
          "
        >
          <CheckCircle2
            className="
              w-20
              h-20
              text-[#00c874]
              mx-auto
            "
          />

          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
              mt-6
            "
          >
            Booking Submitted!
          </h1>

          <p
            className="
              text-slate-500
              mt-3
              leading-relaxed
            "
          >
            Your booking request has been
            sent successfully. Our team will
            review your information and contact
            you.
          </p>

          <p
            className="
              text-sm
              text-slate-400
              mt-3
            "
          >
            The completed booking form has been
            sent to Punjab House as a PDF attachment.
          </p>

          <button
            onClick={() => {
              setSuccess(false);
              setError("");
            }}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              bg-[#00c874]
              hover:bg-[#00b368]
              text-white
              px-7
              py-3
              rounded-full
              font-semibold
              transition
            "
          >
            <FileText className="w-4 h-4" />

            Submit Another Booking
          </button>
        </div>
      </section>
    );
  }

  // =======================================================
  // PAGE
  // =======================================================

  return (
    <section
      className="
        min-h-screen
        bg-slate-50
        py-16
        sm:py-24
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
          px-5
          sm:px-8
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
          "
        >
          <span
            className="
              text-[#00c874]
              font-semibold
              text-xs
              tracking-[0.25em]
              uppercase
            "
          >
            Reservation
          </span>

          <h1
            className="
              text-4xl
              sm:text-5xl
              font-bold
              text-slate-900
              mt-3
            "
          >
            Book Your Event
          </h1>

          <p
            className="
              text-slate-500
              mt-4
              leading-relaxed
            "
          >
            Complete the booking form below
            and our Punjab House team will
            review your request.
          </p>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="
            mt-12
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-slate-100
            p-6
            sm:p-10
          "
        >
          {/* =================================================
              EVENT INFORMATION
          ================================================= */}

          <div>
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#00c874]/10
                  text-[#00c874]
                  flex
                  items-center
                  justify-center
                "
              >
                <Calendar className="w-5 h-5" />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  Event Information
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Tell us about your event.
                </p>
              </div>
            </div>

            <div
              className="
                grid
                md:grid-cols-2
                gap-5
                mt-6
              "
            >
              {/* DATE */}

              <div>
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Date of Event *
                </label>

                <input
                  required
                  type="date"
                  min={today}
                  value={form.eventDate}
                  onChange={(e) =>
                    updateField(
                      "eventDate",
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              {/* EVENT */}

              <div>
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Event *
                </label>

                <select
                  required
                  value={form.event}
                  onChange={(e) =>
                    updateField(
                      "event",
                      e.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select event
                  </option>

                  {eventTypes.map(
                    (event) => (
                      <option
                        key={event}
                        value={event}
                      >
                        {event}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* TIMING */}

              <div>
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Event Timing *
                </label>

                <div className="relative">
                  <Clock
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      text-[#00c874]
                    "
                  />

                  <input
                    required
                    type="text"
                    value={form.eventTiming}
                    onChange={(e) =>
                      updateField(
                        "eventTiming",
                        e.target.value
                      )
                    }
                    className={`
                      ${inputClass}
                      pl-10
                    `}
                    placeholder="07:00 PM - 11:30 PM"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              VENUE CHARGES
          ================================================= */}

          <div
            className="
              border-t
              border-slate-100
              mt-10
              pt-10
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#00c874]/10
                  text-[#00c874]
                  flex
                  items-center
                  justify-center
                "
              >
                <CreditCard className="w-5 h-5" />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  Venue Charges
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Review the applicable charges
                  and agreements.
                </p>
              </div>
            </div>

            <div
              className="
                space-y-4
                mt-6
              "
            >
              {/* LAWN RENT */}

              <label className={agreementClass}>
                <input
                  type="checkbox"
                  checked={
                    form.lawnRentAgreement
                  }
                  onChange={(e) =>
                    updateField(
                      "lawnRentAgreement",
                      e.target.checked
                    )
                  }
                  className="
                    mt-1
                    w-4
                    h-4
                    accent-[#00c874]
                  "
                />

                <div>
                  <div
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    Lawn Rent —{" "}
                    {form.lawnRent}
                  </div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      mt-1
                    "
                  >
                    I agree to the Lawn Rent
                    terms and conditions.
                  </p>
                </div>
              </label>

              {/* MAINTENANCE */}

              <label className={agreementClass}>
                <input
                  type="checkbox"
                  checked={
                    form.maintenanceAgreement
                  }
                  onChange={(e) =>
                    updateField(
                      "maintenanceAgreement",
                      e.target.checked
                    )
                  }
                  className="
                    mt-1
                    w-4
                    h-4
                    accent-[#00c874]
                  "
                />

                <div>
                  <div
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    Maintenance Charges —{" "}
                    {form.maintenanceCharges}
                  </div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      mt-1
                    "
                  >
                    I agree to the maintenance
                    charges and agreement.
                  </p>
                </div>
              </label>

              {/* SECURITY */}

              <label className={agreementClass}>
                <input
                  type="checkbox"
                  checked={
                    form.advanceAgreement
                  }
                  onChange={(e) =>
                    updateField(
                      "advanceAgreement",
                      e.target.checked
                    )
                  }
                  className="
                    mt-1
                    w-4
                    h-4
                    accent-[#00c874]
                  "
                />

                <div>
                  <div
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    Advance / Refundable Security —{" "}
                    {form.advanceSecurity}
                  </div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      mt-1
                    "
                  >
                    I agree to the advance
                    security terms.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* =================================================
              ROOMS
          ================================================= */}

          <div
            className="
              border-t
              border-slate-100
              mt-10
              pt-10
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#00c874]/10
                  text-[#00c874]
                  flex
                  items-center
                  justify-center
                "
              >
                <DoorOpen className="w-5 h-5" />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  Rooms
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Maximum 2 rooms available.
                  Rs. 5,000 per room.
                </p>
              </div>
            </div>

            <div
              className="
                grid
                md:grid-cols-2
                gap-5
                mt-6
              "
            >
              {/* ROOMS */}

              <div>
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  No. of Rooms *
                </label>

                <select
                  required
                  value={form.rooms}
                  onChange={(e) =>
                    handleRoomsChange(
                      e.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option
                    value=""
                    disabled
                  >
                    Select number of rooms
                  </option>

                  <option value="1">
                    1 Room
                  </option>

                  <option value="2">
                    2 Rooms
                  </option>
                </select>
              </div>

              {/* ROOM CHARGES */}

              <div>
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Room Charges
                </label>

                <input
                  readOnly
                  value={form.roomCharges}
                  className={`
                    ${inputClass}
                    bg-slate-50
                  `}
                  placeholder="Automatically calculated"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              CLIENT INFORMATION
          ================================================= */}

          <div
            className="
              border-t
              border-slate-100
              mt-10
              pt-10
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#00c874]/10
                  text-[#00c874]
                  flex
                  items-center
                  justify-center
                "
              >
                <User className="w-5 h-5" />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  Client Information
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Enter your personal and
                  contact information.
                </p>
              </div>
            </div>

            <div
              className="
                grid
                md:grid-cols-2
                gap-5
                mt-6
              "
            >
              {/* NAME */}

              <div className="md:col-span-2">
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Name of Client & Designation / C/o *
                </label>

                <input
                  required
                  type="text"
                  minLength={2}
                  maxLength={80}
                  value={form.clientName}
                  onChange={(e) =>
                    handleClientNameChange(
                      e.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="Enter client name and designation / C/o"
                />
              </div>

              {/* CNIC */}

              <div>
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  C.N.I. No. *
                </label>

                <input
                  required
                  type="text"
                  inputMode="numeric"
                  value={form.cnic}
                  onChange={(e) =>
                    handleCNICChange(
                      e.target.value
                    )
                  }
                  pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                  maxLength={15}
                  className={inputClass}
                  placeholder="42101-1234567-1"
                />
              </div>

              {/* CONTACT */}

              <div>
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Contact No. *
                </label>

                <div className="relative">
                  <Phone
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      text-[#00c874]
                    "
                  />

                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    minLength={10}
                    maxLength={15}
                    value={form.contactNo}
                    onChange={(e) =>
                      handlePhoneChange(
                        e.target.value
                      )
                    }
                    className={`
                      ${inputClass}
                      pl-10
                    `}
                    placeholder="03001234567"
                  />
                </div>

                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-2
                  "
                >
                  Enter numbers only.
                </p>
              </div>

              {/* ADDRESS */}

              <div className="md:col-span-2">
                <label
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Address *
                </label>

                <div className="relative">
                  <MapPin
                    className="
                      absolute
                      left-3
                      top-4
                      w-4
                      h-4
                      text-[#00c874]
                    "
                  />

                  <textarea
                    required
                    minLength={10}
                    maxLength={300}
                    rows={3}
                    value={form.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    className={`
                      ${inputClass}
                      pl-10
                      resize-none
                    `}
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              TERMS
          ================================================= */}

          <div
            className="
              border-t
              border-slate-100
              mt-10
              pt-10
            "
          >
            <label
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[#00c874]/20
                bg-[#00c874]/5
                p-5
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={form.termsAccepted}
                onChange={(e) =>
                  updateField(
                    "termsAccepted",
                    e.target.checked
                  )
                }
                className="
                  mt-1
                  w-5
                  h-5
                  accent-[#00c874]
                "
              />

              <div>
                <div
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  I have read and accepted all
                  terms and conditions *
                </div>

                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-1
                  "
                >
                  By submitting this booking request,
                  I confirm that the information provided
                  is correct and that I accept the Punjab
                  House booking terms.
                </p>
              </div>
            </label>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="
                mt-6
                rounded-xl
                bg-red-50
                border
                border-red-200
                text-red-700
                px-4
                py-3
                text-sm
              "
            >
              {error}
            </div>
          )}

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <button
            type="submit"
            disabled={submitting}
            className="
              mt-8
              w-full
              inline-flex
              items-center
              justify-center
              gap-2
              bg-[#00c874]
              hover:bg-[#00b368]
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              px-6
              py-4
              rounded-full
              font-bold
              text-lg
              transition
              shadow-xl
              shadow-[#00c874]/20
            "
          >
            {submitting ? (
              <>
                <Loader2
                  className="
                    w-5
                    h-5
                    animate-spin
                  "
                />

                Submitting Booking...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />

                Submit Booking
              </>
            )}
          </button>

          <p
            className="
              text-center
              text-xs
              text-slate-400
              mt-4
            "
          >
            Your booking information will be sent
            securely to Punjab House.
          </p>
        </form>
      </div>
    </section>
  );
}