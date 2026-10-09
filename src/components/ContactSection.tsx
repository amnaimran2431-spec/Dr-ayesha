import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, Navigation, Clock } from 'lucide-react';
import { ClinicDetails } from '../types';

interface ContactSectionProps {
  clinic: ClinicDetails;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ clinic }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const encodedMapsQuery = encodeURIComponent(
    `${clinic.name}, Plot 17, Block S, Gulberg II, Lahore, Pakistan`
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedMapsQuery}`;

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const namePart = inquiryName.trim() ? ` from ${inquiryName.trim()}` : '';
    const bodyPart = inquiryMessage.trim()
      ? inquiryMessage.trim()
      : 'I would like to inquire about consultation availability and clinic timings.';

    const message = `Assalam-o-Alaikum, this is an inquiry${namePart} for ${clinic.name}: ${bodyPart}`;
    const url = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 bg-teal-800/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider text-teal-300 uppercase mb-2">
            Get in Touch
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            Contact Dr. Ayesha Naveed Clinic
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Our clinic desk is ready to assist you with appointment scheduling, directions, and consultation inquiries.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Phone Helpline */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-300 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Call the Clinic</h3>
              <p className="text-xs text-slate-300 mt-1">
                Direct phone helpline for consultations & confirmations.
              </p>
              <div className="mt-4 font-mono text-lg font-bold text-teal-300 tracking-tight">
                {clinic.phoneDisplay}
              </div>
            </div>

            <a
              href={`tel:${clinic.phone}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-teal-300 hover:bg-teal-200 rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">WhatsApp Desk</h3>
              <p className="text-xs text-slate-300 mt-1">
                Fast coordination for appointments and message replies.
              </p>
              <div className="mt-4 font-mono text-lg font-bold text-emerald-400 tracking-tight">
                {clinic.whatsappDisplay}
              </div>
            </div>

            <a
              href={`https://wa.me/${clinic.whatsappNumber}?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20consultations%20at%20${encodeURIComponent(clinic.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Physical Address & Directions */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-300 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Clinic Address</h3>
              <p className="text-xs text-slate-300 mt-1">
                Centrally located in Gulberg II, Lahore.
              </p>
              <div className="mt-4 text-xs text-slate-200 leading-relaxed">
                <p className="font-semibold text-white">{clinic.street}</p>
                <p>{clinic.area}, {clinic.city}, Pakistan</p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-teal-200 bg-slate-700/80 hover:bg-slate-700 border border-slate-600 rounded-xl transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-300" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>

        {/* Quick Message Box */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-bold text-white">
              Send a Direct Inquiry to the Clinic
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Have a quick question about consultation availability? Type your message below to send directly via WhatsApp.
            </p>
          </div>

          <form onSubmit={handleQuickInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inquiryName" className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="inquiryName"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label htmlFor="inquiryMessage" className="block text-xs font-medium text-slate-300 mb-1">
                  Your Question / Note
                </label>
                <input
                  type="text"
                  id="inquiryMessage"
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="e.g. Are appointments available this Thursday afternoon?"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Our desk responds during active clinic coordination hours.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-300 hover:bg-teal-200 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
