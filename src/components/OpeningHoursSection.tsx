import React from 'react';
import { Clock, Phone, MessageSquare, AlertCircle, Calendar } from 'lucide-react';
import { ClinicDetails } from '../types';

interface OpeningHoursSectionProps {
  clinic: ClinicDetails;
  onBookClick: () => void;
}

export const OpeningHoursSection: React.FC<OpeningHoursSectionProps> = ({ clinic, onBookClick }) => {
  const { hours } = clinic;

  return (
    <section id="hours" className="py-16 sm:py-24 bg-slate-50/70 text-slate-800 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase mb-2">
            Clinic Schedule
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Consultation Hours & Schedule
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Consultations are arranged by prior appointment to respect patient privacy and provide dedicated clinical attention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Weekly Schedule Table Container */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-300" />
                <h3 className="text-sm font-bold tracking-wide">
                  Weekly Consultation Timing
                </h3>
              </div>
              <span className="text-xs font-medium text-teal-300 border border-teal-500/30 px-2.5 py-0.5 rounded-md bg-teal-950/60">
                {hours.isHoursConfirmed ? 'Confirmed Schedule' : 'By Prior Appointment'}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {hours.days.map((dayItem) => (
                <div
                  key={dayItem.day}
                  className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-800">
                    {dayItem.day}
                  </span>

                  <div className="flex items-center gap-3">
                    {hours.isHoursConfirmed ? (
                      <span className="text-sm font-mono text-slate-700">
                        {dayItem.timeSlot}
                      </span>
                    ) : (
                      <span className="text-xs sm:text-sm text-slate-600">
                        {dayItem.isOpen ? 'By Prior Appointment' : 'Closed / WhatsApp Inquiries'}
                      </span>
                    )}

                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        dayItem.isOpen
                          ? 'bg-teal-50 text-teal-800 border border-teal-200/70'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {dayItem.isOpen ? 'Available' : 'Closed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Advance Notice Note Box */}
            <div className="p-5 bg-teal-50/50 border-t border-slate-200 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-teal-950 block mb-0.5">
                  Important Notice Before Visiting:
                </span>
                {hours.notice}
              </div>
            </div>
          </div>

          {/* Right Card: Quick Planning Guidance */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                <Calendar className="w-4 h-4" />
                <span>Planning Your Consultation</span>
              </div>
              
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                  <span>
                    <strong>Same-Day Requests:</strong> Please call before 12:00 PM to check if an open slot is available.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                  <span>
                    <strong>Follow-Up Visits:</strong> Bring your previous prescription or test orders for a streamlined review.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                  <span>
                    <strong>Rescheduling:</strong> If you are unable to attend, kindly inform us on WhatsApp at least 2 hours in advance.
                  </span>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${clinic.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-teal-950 bg-teal-100/80 hover:bg-teal-200/80 rounded-xl transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {clinic.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={onBookClick}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Book Online</span>
                </button>
              </div>
            </div>

            {/* Emergency Caution */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 text-xs text-rose-900 leading-relaxed">
              <span className="font-bold block text-rose-950 mb-0.5">Emergency Advice:</span>
              The clinic is an outpatient facility. In case of acute medical emergencies, sudden chest pain, trauma, or severe breathing difficulties, please call emergency services (1122) immediately.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
