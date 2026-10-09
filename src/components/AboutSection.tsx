import React from 'react';
import { UserCheck, Award, Stethoscope, Languages, FileText, CheckCircle2, AlertCircle, Edit3 } from 'lucide-react';
import { ClinicDetails } from '../types';

interface AboutSectionProps {
  clinic: ClinicDetails;
  onOpenAdmin: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ clinic, onOpenAdmin }) => {
  const { doctor } = clinic;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white text-slate-800 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase mb-2">
            Practice Overview
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Care Designed Around You
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            At Dr. Ayesha Naveed Clinic, healthcare begins with attentive listening and thorough clinical evaluation. Our Gulberg II practice emphasizes individualized medical consultations in a serene and confidential environment.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Doctor Profile & Credentials Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Doctor Profile Container */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {doctor.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full">
                      <UserCheck className="w-3 h-3 text-teal-700" />
                      Physician
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {doctor.isSpecializationVerified && doctor.specialization
                      ? doctor.specialization
                      : 'Medical Practitioner · In-Person Consultations'}
                  </p>
                </div>

                {/* Edit Button for Clinic Desk */}
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-colors shadow-2xs"
                  title="Verify and update credentials"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Details</span>
                </button>
              </div>

              {/* Credential Data List */}
              <div className="mt-6 space-y-4">
                
                {/* Qualifications */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-teal-50 text-teal-800 rounded-lg shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Qualifications & Degrees
                      </span>
                      {doctor.isQualificationsVerified ? (
                        <span className="text-[10px] text-teal-800 font-medium flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-800 font-medium flex items-center gap-0.5">
                          <AlertCircle className="w-2.5 h-2.5" /> Pending Confirmation
                        </span>
                      )}
                    </div>
                    {doctor.isQualificationsVerified && doctor.qualifications ? (
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">
                        {doctor.qualifications}
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center justify-between text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-dashed border-slate-300">
                        <span>Details pending doctor confirmation (editable in clinic settings).</span>
                        <button
                          type="button"
                          onClick={onOpenAdmin}
                          className="text-teal-700 hover:underline font-medium text-[11px]"
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specialization / Clinical Focus */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-teal-50 text-teal-800 rounded-lg shrink-0 mt-0.5">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Clinical Focus / Specialization
                      </span>
                      {doctor.isSpecializationVerified ? (
                        <span className="text-[10px] text-teal-800 font-medium flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-medium">
                          General Practice & Consultations
                        </span>
                      )}
                    </div>
                    {doctor.isSpecializationVerified && doctor.specialization ? (
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">
                        {doctor.specialization}
                      </p>
                    ) : (
                      <div className="mt-1 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                        General Outpatient Medical Care · Specific sub-specialties kept unlisted until verified.
                      </div>
                    )}
                  </div>
                </div>

                {/* Medical Council Registration (PMDC / PMC) */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-teal-50 text-teal-800 rounded-lg shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Medical Registration (PMDC / PMC)
                      </span>
                    </div>
                    {doctor.isRegistrationVerified && doctor.pmdcNumber ? (
                      <p className="text-sm font-mono font-medium text-slate-800 mt-0.5">
                        {doctor.pmdcNumber}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500 mt-1 italic">
                        Registration record available for verification upon clinic request.
                      </p>
                    )}
                  </div>
                </div>

                {/* Languages Spoken */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-teal-50 text-teal-800 rounded-lg shrink-0 mt-0.5">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Consultation Languages
                    </span>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-700 font-medium">
                      {doctor.languages.map((lang, index) => (
                        <React.Fragment key={lang}>
                          {index > 0 && <span className="text-slate-300">·</span>}
                          <span>{lang}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Privacy and Verification Note */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 leading-normal">
                Dr. Ayesha Naveed Clinic maintains transparent medical records. In compliance with strict professional standards, unverified credentials are never assumed or fabricated.
              </div>
            </div>

            {/* Practice Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <h4 className="text-sm font-bold text-slate-900">Unhurried Appointments</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Dedicated time slots so you can discuss your health history and symptoms without feeling rushed.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <h4 className="text-sm font-bold text-slate-900">Strict Confidentiality</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Private consultation environment safeguarding your medical records and personal health details.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Clinic Photograph & Location highlight */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 group">
              <img
                src="/src/assets/images/medical_consultation_desk_1791537782374.jpg"
                alt="Medical stethoscope and consultation desk at Dr. Ayesha Naveed Clinic, Gulberg II, Lahore"
                className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900">
                  Ethical, Evidence-Based Medical Consultations
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Located in Block S, Gulberg II — accessible for patients across central Lahore.
                </p>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="p-5 rounded-2xl bg-teal-900 text-white shadow-xs">
              <h4 className="text-sm font-bold text-teal-200">
                Direct Appointment Inquiries
              </h4>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                Have specific questions regarding consultations or doctor availability? Connect directly with our front desk.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`tel:${clinic.phone}`}
                  className="px-3.5 py-2 text-xs font-semibold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded-lg transition-colors"
                >
                  Call {clinic.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${clinic.whatsappNumber}?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20consultations%20at%20${encodeURIComponent(clinic.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-700 border border-teal-700 rounded-lg transition-colors"
                >
                  WhatsApp Clinic
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
