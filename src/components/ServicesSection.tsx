import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ClinicDetails } from '../types';

interface ServicesSectionProps {
  clinic: ClinicDetails;
  onBookClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ clinic, onBookClick }) => {
  // Only render confirmed services as strictly requested: "Keep unconfirmed services hidden until verified."
  const confirmedServices = clinic.services.filter((s) => s.isConfirmed);

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50/60 text-slate-800 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase mb-2">
              Clinical Offerings
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Medical Services & Consultations
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Careful, patient-centered healthcare provided through thorough assessments and evidence-grounded medical guidance.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs max-w-sm">
            <span className="font-semibold text-slate-700 block mb-0.5">Clinical Scope Note</span>
            Sub-specialty diagnostic procedures are verified upon direct clinical inquiry. Unconfirmed specialties remain hidden until officially updated.
          </div>
        </div>

        {/* Services Grid with Asymmetric Bento rhythm & clean editorial numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {confirmedServices.map((service, index) => {
            const editorialIndex = String(index + 1).padStart(2, '0');
            const isMarquee = index === 0;

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all duration-200 group ${
                  isMarquee ? 'lg:col-span-2 bg-gradient-to-br from-white to-teal-50/30' : ''
                }`}
              >
                <div>
                  {/* Top Bar of Card: Human Editorial Number & Category kicker */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-xs font-mono font-medium text-teal-800 tracking-wider">
                      {editorialIndex}.
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {service.badge || 'Consultation'}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4 group-hover:text-teal-900 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Clinical Points */}
                  <div className="mt-5 pt-4 border-t border-slate-100/80 space-y-2">
                    {service.keyPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    In-Person at Gulberg II
                  </span>
                  <button
                    type="button"
                    onClick={onBookClick}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Request Slot</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking strip */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              Need a personalized health consultation?
            </h4>
            <p className="text-xs text-slate-300">
              Appointments are arranged in advance to ensure comfortable, dedicated doctor time.
            </p>
          </div>
          <button
            type="button"
            onClick={onBookClick}
            className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-teal-300 hover:bg-teal-200 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            Book an Appointment
          </button>
        </div>

      </div>
    </section>
  );
};
