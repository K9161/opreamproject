import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // Connect this form to the backend's password-reset endpoint when provided.
    setSubmitted(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Mail size={23} />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Forgot password?</h1>
        <p className="mb-6 text-sm leading-6 text-slate-500">
          Enter your account email address and we’ll help you reset your password.
        </p>
        {submitted ? (
          <p role="status" className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">
            The form is ready. Connect it to the backend password-reset API to send a reset link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="reset-email" className="block text-sm font-semibold text-slate-700">Email address</label>
            <input
              id="reset-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <button type="submit" className="w-full rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800">
              Continue
            </button>
          </form>
        )}
        <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 no-underline hover:text-blue-900">
          <ArrowLeft size={16} /> Back to login
        </Link>
      </section>
    </main>
  );
}
