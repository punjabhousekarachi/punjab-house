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
  Building2,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

// ======================================================
// RAILWAY BACKEND
// ======================================================

const API_URL =
  "https://punjab-house-production.up.railway.app";

// ======================================================
// TERMS & CONDITIONS IMAGE
// ======================================================

const TERMS_IMAGE = "/terms-and-conditions.jpg";

// ======================================================
// INITIAL FORM
// ======================================================

const initialForm = {
  eventDate: "",
  event: "",
  eventTiming: "",

  lawnRent: "Rs. 500,000/-",
  lawnRentAgreement: false,

  maintenanceCharges: "Rs. 500,000/-",
  maintenanceAgreement: false,

  advanceSecurity: "Rs. 100,000/-",
  advanceAgreement: false,

  rooms: "1",
  roomCharges: "Rs. 5,000/-",

  clientName: "",
  cnic: "",
  address: "",
  contactNo: "",

  termsAccepted: false,
};

// ======================================================
// BOOK NOW
// ======================================================

export default function BookNow() {
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Controls whether the booking form is visible
  const [showForm, setShowForm] = useState(true);

  // ====================================================
  // HANDLE INPUT
  // ====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");
    setSuccess("");
  };

  // ====================================================
  // ROOM CHANGE
  // ====================================================

  const handleRoomChange = (e) => {
    const rooms = e.target.value;

    setForm((previous) => ({
      ...previous,

      rooms,

      roomCharges:
        rooms === "2"
          ? "Rs. 10,000/-"
          : "Rs. 5,000/-",
    }));

    setError("");
    setSuccess("");
  };

  // ====================================================
  // CNIC FORMAT
  // ====================================================

  const handleCNIC = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Maximum 13 digits
    if (value.length > 13) {
      value = value.substring(0, 13);
    }

    // XXXXX-XXXXXXX-X
    if (value.length > 5) {
      value =
        value.substring(0, 5) +
        "-" +
        value.substring(5);
    }

    if (value.length > 13) {
      value =
        value.substring(0, 13) +
        "-" +
        value.substring(13);
    }

    setForm((previous) => ({
      ...previous,
      cnic: value,
    }));

    setError("");
    setSuccess("");
  };

  // ====================================================
  // VALIDATION
  // ====================================================

  const validateForm = () => {
    if (!form.eventDate) {
      return "Please select the event date.";
    }

    if (!form.event) {
      return "Please select the event type.";
    }

    if (!form.eventTiming) {
      return "Please select the event timing.";
    }

    if (!form.lawnRentAgreement) {
      return "Please accept the Lawn Rent agreement.";
    }

    if (!form.maintenanceAgreement) {
      return "Please accept the Maintenance Charges agreement.";
    }

    if (!form.advanceAgreement) {
      return "Please accept the Advance Security agreement.";
    }

    if (!["1", "2"].includes(form.rooms)) {
      return "Please select 1 or 2 rooms.";
    }

    if (!form.clientName.trim()) {
      return "Please enter the client name.";
    }

    const cnicRegex =
      /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

    if (!cnicRegex.test(form.cnic)) {
      return (
        "Please enter a valid CNIC. " +
        "Example: 00000-0000000-0"
      );
    }

    const phone =
      form.contactNo.replace(/[\s-]/g, "");

    if (!/^[0-9]{10,15}$/.test(phone)) {
      return "Please enter a valid contact number.";
    }

    if (
      !form.address.trim() ||
      form.address.trim().length < 10
    ) {
      return "Please enter a complete address.";
    }

    if (!form.termsAccepted) {
      return "Please accept the Terms & Conditions.";
    }

    return null;
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (!API_URL) {
      setError(
        "Railway backend URL has not been configured."
      );

      return;
    }

    setLoading(true);

    try {
      console.log(
        "📤 Sending booking to Railway..."
      );

      const response = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      let result = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      console.log(
        "📥 Railway response:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Server error: ${response.status}`
        );
      }

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Booking could not be submitted."
        );
      }

      // ================================================
      // SUCCESS
      // ================================================

      setSuccess(
        "Booking submitted successfully! Your booking form has been sent to Punjab House."
      );

      // Reset form
      setForm(initialForm);

      // IMPORTANT:
      // Hide the form after successful submission
      setShowForm(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (err) {
      console.error(
        "BOOKING SUBMISSION ERROR:",
        err
      );

      let message =
        "Unable to submit booking. Please try again.";

      if (
        err instanceof TypeError &&
        err.message === "Failed to fetch"
      ) {
        message =
          "Unable to connect to the Railway server. Please check that the backend is online and CORS is configured correctly.";
      } else if (err.message) {
        message = err.message;
      }

      setError(message);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // SHOW FORM AGAIN
  // ====================================================

  const handleNewBooking = () => {
    setForm(initialForm);
    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ====================================================
  // TODAY
  // ====================================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // ====================================================
  // UI
  // ====================================================

  return (
    <main className="min-h-screen bg-slate-950 pt-20 text-slate-900">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">

        {/* GLOW EFFECTS */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute right-0 top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-slate-800/50 blur-3xl" />

        </div>

        {/* HERO CONTENT */}

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            {/* BADGE */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">

              <Building2 size={16} />

              Punjab House Karachi

            </div>

            {/* TITLE */}

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">

              Event Booking Form

            </h1>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">

              Complete the booking request below
              to submit your event details to
              Punjab House Karachi.

            </p>

          </div>

        </div>

      </section>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

        <div className="mx-auto max-w-5xl">

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {success && (

            <div className="mb-8 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 shadow-sm">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">

                <CheckCircle2 size={22} />

              </div>

              <div>

                <h3 className="font-bold">
                  Booking Submitted
                </h3>

                <p className="mt-1 text-sm leading-6">
                  {success}
                </p>

              </div>

            </div>

          )}

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (

            <div className="mb-8 flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 font-bold text-white">

                !

              </div>

              <div>

                <h3 className="font-bold">
                  Submission Failed
                </h3>

                <p className="mt-1 text-sm leading-6">
                  {error}
                </p>

              </div>

            </div>

          )}

          {/* =================================================
              AFTER SUCCESS
          ================================================= */}

          {!showForm && (

            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">

                <CheckCircle2
                  size={42}
                  className="text-emerald-500"
                />

              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-950 sm:text-3xl">

                Your Booking Has Been Submitted

              </h2>

              <p className="mx-auto mt-3 max-w-xl text-slate-600">

                Thank you for submitting your booking
                request. Punjab House has received
                your information successfully.

              </p>

              <button
                type="button"
                onClick={handleNewBooking}
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-7 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >

                <RotateCcw size={20} />

                Make Another Booking

              </button>

            </div>

          )}

          {/* =================================================
              FORM
          ================================================= */}

          {showForm && (

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* =================================================
                  EVENT INFORMATION
              ================================================= */}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">

                      <Calendar size={21} />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-slate-950">
                        Event Information
                      </h2>

                      <p className="text-sm text-slate-500">
                        Tell us about your event
                      </p>

                    </div>

                  </div>

                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">

                  {/* DATE */}

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-800">
                      Date of Event *
                    </label>

                    <div className="relative">

                      <Calendar
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                      />

                      <input
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        min={today}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      />

                    </div>

                  </div>

                  {/* EVENT */}

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-800">
                      Event *
                    </label>

                    <select
                      name="event"
                      value={form.event}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    >

                      <option value="">
                        Select event type
                      </option>

                      <option value="Wedding">
                        Wedding
                      </option>

                      <option value="Walima">
                        Walima
                      </option>

                      <option value="Shalima">
                        Shalima
                      </option>

                      <option value="Nikah">
                        Nikah
                      </option>

                      <option value="Corporate Event">
                        Corporate Event
                      </option>

                    </select>

                  </div>

                  {/* EVENT TIMING */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-bold text-slate-800">
                      Event Timing *
                    </label>

                    <div className="relative">

                      <Clock
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                      />

                      <select
                        name="eventTiming"
                        value={form.eventTiming}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-10 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      >

                        <option value="">
                          Select event timing
                        </option>

                        <option value="Morning">
                          Morning
                        </option>

                        <option value="Afternoon">
                          Afternoon
                        </option>

                        <option value="Evening">
                          Evening
                        </option>

                      </select>

                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        ▼
                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  VENUE CHARGES
              ================================================= */}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">

                      <CreditCard size={21} />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-slate-950">
                        Venue Charges
                      </h2>

                      <p className="text-sm text-slate-500">
                        Review the applicable charges
                        and agreements
                      </p>

                    </div>

                  </div>

                </div>

                <div className="space-y-4 p-6 sm:p-8">

                  <Agreement
                    title="Lawn Rent"
                    amount={form.lawnRent}
                    name="lawnRentAgreement"
                    checked={form.lawnRentAgreement}
                    onChange={handleChange}
                  />

                  <Agreement
                    title="Maintenance Charges"
                    amount={form.maintenanceCharges}
                    name="maintenanceAgreement"
                    checked={form.maintenanceAgreement}
                    onChange={handleChange}
                  />

                  <Agreement
                    title="Advance / Refundable Security"
                    amount={form.advanceSecurity}
                    name="advanceAgreement"
                    checked={form.advanceAgreement}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* =================================================
                  ROOMS
              ================================================= */}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">

                      <DoorOpen size={21} />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-slate-950">
                        Rooms
                      </h2>

                      <p className="text-sm text-slate-500">
                        Maximum 2 rooms available.
                        Rs. 5,000 per room.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-800">
                      No. of Rooms *
                    </label>

                    <select
                      name="rooms"
                      value={form.rooms}
                      onChange={handleRoomChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    >

                      <option value="1">
                        1 Room
                      </option>

                      <option value="2">
                        2 Rooms
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-800">
                      Room Charges
                    </label>

                    <div className="flex min-h-[54px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-700">

                      {form.roomCharges}

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  CLIENT INFORMATION
              ================================================= */}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">

                      <User size={21} />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-slate-950">
                        Client Information
                      </h2>

                      <p className="text-sm text-slate-500">
                        Personal and contact information
                      </p>

                    </div>

                  </div>

                </div>

                <div className="space-y-6 p-6 sm:p-8">

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-800">
                      Name of Client & Designation / C/o *
                    </label>

                    <input
                      type="text"
                      name="clientName"
                      value={form.clientName}
                      onChange={handleChange}
                      placeholder="Enter client name"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />

                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-bold text-slate-800">
                        C.N.I. No. *
                      </label>

                      <input
                        type="text"
                        name="cnic"
                        value={form.cnic}
                        onChange={handleCNIC}
                        placeholder="00000-0000000-0"
                        maxLength={15}
                        required
                        inputMode="numeric"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-bold text-slate-800">
                        Contact No. *
                      </label>

                      <div className="relative">

                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                        />

                        <input
                          type="tel"
                          name="contactNo"
                          value={form.contactNo}
                          onChange={handleChange}
                          placeholder="03001234567"
                          required
                          inputMode="tel"
                          className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />

                      </div>

                    </div>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-800">
                      Address *
                    </label>

                    <div className="relative">

                      <MapPin
                        size={18}
                        className="absolute left-4 top-4 text-emerald-600"
                      />

                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Enter complete address"
                        required
                        className="w-full resize-none rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  TERMS
              ================================================= */}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">

                      <ShieldCheck size={21} />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-slate-950">
                        Terms & Conditions
                      </h2>

                      <p className="text-sm text-slate-500">
                        Please read the terms and conditions carefully
                      </p>

                    </div>

                  </div>

                </div>

                <div className="space-y-6 p-6 sm:p-8">

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                    <img
                      src={TERMS_IMAGE}
                      alt="Punjab House Terms and Conditions"
                      className="h-auto w-full object-contain"
                    />

                  </div>

                  <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-emerald-50">

                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={form.termsAccepted}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 shrink-0 accent-emerald-500"
                    />

                    <span className="text-sm leading-6 text-slate-700">

                      I have read and accepted
                      all Terms & Conditions
                      of Punjab House Karachi.

                    </span>

                  </label>

                </div>

              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <div className="rounded-3xl bg-emerald-500 p-6 shadow-lg shadow-emerald-500/20 sm:p-8">

                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

                  <div className="text-center sm:text-left">

                    <h3 className="text-xl font-bold text-white">
                      Ready to Submit?
                    </h3>

                    <p className="mt-1 text-sm text-emerald-50">
                      Your completed booking form
                      will be sent to Punjab House.
                    </p>

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-w-[210px] items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={20} />

                        Submit Booking
                      </>
                    )}

                  </button>

                </div>

              </div>

            </form>

          )}

          {/* =================================================
              INFORMATION
          ================================================= */}

          {showForm && (

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <FileText
                size={21}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>

                <h3 className="font-bold text-slate-900">
                  Booking Confirmation
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">

                  After successful submission, the
                  booking information is processed
                  by the Punjab House booking system
                  and a completed PDF form is
                  generated for the administration.

                </p>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

// ======================================================
// AGREEMENT COMPONENT
// ======================================================

function Agreement({
  title,
  amount,
  name,
  checked,
  onChange,
}) {
  return (

    <label
      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${
        checked
          ? "border-emerald-300 bg-emerald-50"
          : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50"
      }`}
    >

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 accent-emerald-500"
      />

      <div className="min-w-0 flex-1">

        <div className="font-bold text-slate-900">
          {title}
        </div>

        <div className="mt-1 text-sm font-semibold text-emerald-600">
          {amount}
        </div>

      </div>

      <div
        className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:block ${
          checked
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-500"
        }`}
      >

        {checked
          ? "Accepted"
          : "Required"}

      </div>

      {checked && (

        <CheckCircle2
          size={22}
          className="shrink-0 text-emerald-500"
        />

      )}

    </label>
  );
}

