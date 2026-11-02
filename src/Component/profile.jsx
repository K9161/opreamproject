
import React from "react";
import { Building2, CalendarDays, Check } from "lucide-react";
import { useI18n } from "../i18n";
import avatar from "../assets/profile.png";// Static placeholders until the backend returns these fields.
const DEFAULT_STUDENT = {
  studentId: "STD-2024-91048",
  gpa: 3.94,
  maxGpa: 4.0,
};

const STEPS = [
  { key: "application", name: "stepApplication", done: "verified", current: "inProgress", upcoming: "inProgress" },
  { key: "approval", name: "stepApproval", done: "approved", current: "inProgress", upcoming: "inProgress" },
  { key: "placement", name: "stepPlacement", done: "completed", current: "inProgress", upcoming: "inProgress" },
  { key: "reports", name: "stepReports", done: "completed", current: "inProgress", upcoming: "upcoming" },
  { key: "evaluation", name: "stepEvaluation", done: "completed", current: "inProgress", upcoming: "scheduled" },
];

const INTERNSHIPS = [
  { id: 1, title: "internshipFrontend", currentStep: 3 },
  { id: 2, title: "internshipBackend", currentStep: 2 },
];

function StepCard({ index, step, state, t }) {
  const styles = {
    done: "bg-sky-100 text-emerald-800",
    current: "bg-blue-800 text-white shadow-md",
    upcoming: "bg-sky-100/60 text-slate-400",
  }[state];

  const subLabel = t(step[state === "done" ? "done" : state === "current" ? "current" : "upcoming"]);

  return (
    <div className={`flex min-h-[64px] items-center gap-3 rounded-xl px-4 py-3 ${styles}`}>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
          state === "done"
            ? "bg-emerald-800 text-white"
            : state === "current"
            ? "bg-white text-blue-800"
            : "border border-slate-300 bg-white text-slate-400"
        }`}
      >
        {state === "done" ? <Check size={13} strokeWidth={3} /> : index + 1}
      </span>

      <span className="min-w-0 text-xs leading-snug">
        <span className={`block ${state === "done" ? "font-medium text-slate-700" : state === "current" ? "font-medium" : ""}`}>
          {t(step.name)}
        </span>
        <span className="block font-semibold">{subLabel}</span>
      </span>
    </div>
  );
}

export default function Profile({ userData }) {
  const { t } = useI18n();

  const user = userData?.user || userData || {};
  const displayName = user.name || user.username || t("student");

  const student = {
    ...DEFAULT_STUDENT,
    ...(user.studentId ? { studentId: user.studentId } : {}),
    ...(user.gpa ? { gpa: user.gpa } : {}),
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Student card */}
      <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <img
            src={avatar}
            alt={displayName}
            className="h-20 w-20 shrink-0 rounded-2xl object-cover"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">{displayName}</h1>
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                {t("registrarVerified")}
              </span>
            </div>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {student.studentId} • {t("faculty")}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Building2 size={15} />
                {t("mainCampus")}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays size={15} />
                {t("admitted")}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-indigo-200 bg-indigo-100/70 px-8 py-4 text-center md:min-w-[200px]">
          <p className="text-sm font-medium text-slate-700">{t("gpa")}</p>
          <p className="mt-2 flex items-baseline justify-center gap-2">
            <span className="text-2xl font-bold text-blue-700">
              {Number(student.gpa).toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-slate-600">
              / {Number(student.maxGpa).toFixed(1)}
            </span>
          </p>
        </div>
      </section>

      {/* Internship progress */}
      {INTERNSHIPS.map((internship) => (
        <section
          key={internship.id}
          className="rounded-2xl border border-slate-300 bg-white p-5"
        >
          <div className="flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-slate-900">
              {internship.id}
            </span>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {t(internship.title)}
              </h2>
              <p className="mt-1 text-sm text-slate-700">
                {t("progressStatus")}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => {
              const n = i + 1;
              const state =
                n < internship.currentStep
                  ? "done"
                  : n === internship.currentStep
                  ? "current"
                  : "upcoming";

              return (
                <StepCard
                  key={step.key}
                  index={i}
                  step={step}
                  state={state}
                  t={t}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
