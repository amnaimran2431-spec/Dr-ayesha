import React from 'react';
import { Phone, MessageSquare, Calendar, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { ClinicDetails } from '../types';

interface HeroProps {
  clinic: ClinicDetails;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ clinic, onBookClick }) => {
  const whatsappUrl = `https://wa.me/${clinic.whatsappNumber}?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20consultations%20at%20${encodeURIComponent(clinic.name)}.`;

  return (
    <section id="home" className="relative bg-gradient-to-b from-teal-950 via-slate-900 to-slate-900 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Subtle organic ambient glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Description & CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Unboxed natural kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-300 uppercase">
              <span>Private Practice</span>
              <span aria-hidden="true">·</span>
              <span>Plot 17, Block S, Gulberg II</span>
              <span aria-hidden="true">·</span>
              <span>Lahore</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] text-balance">
              Your Health Deserves Thoughtful Care
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              A welcoming healthcare experience focused on your needs. Contact our clinic to learn about available consultations and appointments.
            </p>

            {/* Action Buttons Trio */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              {/* Primary: Request an Appointment */}
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-teal-300 hover:bg-teal-200 active:scale-[0.98] rounded-xl shadow-md transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-teal-400 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-900" />
                <span>Request an Appointment</span>
              </button>

              {/* Call the Clinic */}
              <a
                href={`tel:${clinic.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-xl transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-teal-400"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                <span>Call the Clinic</span>
              </a>

              {/* WhatsApp Us */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-xl transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Verified Trust Markers Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Gulberg II Location</span>
                  <span className="text-slate-400">Plot 17, Block S, Lahore</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Prior Appointment</span>
                  <span className="text-slate-400">Scheduled to reduce waiting</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Private & Ethical</span>
                  <span className="text-slate-400">Dedicated patient attention</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Healthcare Photograph (No fake portrait) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-800 group">
              <img
                src="/src/assets/images/hero_clinic_interior_1791537754460.jpg"
                alt="Modern, serene consultation room at Dr. Ayesha Naveed Clinic in Gulberg II, Lahore"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Scrim overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-xl p-3.5 border border-slate-700/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Dr. Ayesha Naveed Clinic
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Comfortable, calm outpatient consultation suite
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-md bg-teal-950/50">
                    Gulberg II
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
