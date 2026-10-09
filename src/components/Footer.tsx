import React, { useState } from 'react';
import { ClinicLogo } from './ClinicLogo';
import { ClinicDetails } from '../types';
import { Phone, MessageSquare, MapPin, ShieldAlert, X } from 'lucide-react';

interface FooterProps {
  clinic: ClinicDetails;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ clinic, onBookClick }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Practice', href: '#about' },
    { label: 'Clinical Services', href: '#services' },
    { label: 'Request Appointment', href: '#appointments' },
    { label: 'Consultation Hours', href: '#hours' },
    { label: 'Location & Map', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            
            {/* Col 1: Brand & Intro */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <ClinicLogo size="md" monochrome={false} />
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {clinic.name}
                  </h3>
                  <span className="text-xs text-teal-400 font-medium tracking-wide">
                    Gulberg II · Lahore, Pakistan
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                A dedicated private outpatient medical clinic committed to thoughtful, thorough, and confidential patient healthcare. Consultations scheduled in advance for personalized clinical attention.
              </p>

              <div className="pt-2 text-xs text-slate-400">
                <span>Plot 17, Block S, Gulberg II, Lahore</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSmoothScroll(link.href);
                      }}
                      className="hover:text-teal-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Direct Contact & Helpline */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                Contact & Inquiries
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <a href={`tel:${clinic.phone}`} className="hover:text-white transition-colors">
                    {clinic.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <a
                    href={`https://wa.me/${clinic.whatsappNumber}?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20consultations%20at%20${encodeURIComponent(clinic.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp: {clinic.whatsappDisplay}
                  </a>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Plot 17, Block S, Gulberg II, Lahore, Pakistan</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-300 hover:bg-teal-200 rounded-lg transition-colors"
                >
                  Request Consultation Slot
                </button>
              </div>
            </div>

          </div>

          {/* Mandatory Medical Disclaimer Box */}
          <div className="my-8 p-4.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Medical Disclaimer: </strong>
              The information published on this website is for general educational and clinic informational purposes only and does not substitute for formal medical evaluation, diagnosis, or treatment by a licensed physician. Always seek the advice of your qualified healthcare provider regarding any health condition. Never disregard professional medical advice or delay seeking it because of something read on this website. For urgent medical emergencies, immediately contact emergency ambulance services (1122) or visit your nearest hospital emergency unit.
            </div>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              © {new Date().getFullYear()} {clinic.name}. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-white transition-colors"
              >
                Privacy & Data Policy
              </button>
              <span>·</span>
              <a
                href="#appointments"
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll('#appointments');
                }}
                className="hover:text-white transition-colors"
              >
                Appointment Booking
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              aria-label="Close Privacy Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="privacy-modal-title" className="text-lg font-bold text-slate-900 mb-3">
              Privacy & Patient Confidentiality Policy
            </h3>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>1. Patient Confidentiality:</strong> Dr. Ayesha Naveed Clinic respects the sanctity of patient health records. Information shared via appointment requests, WhatsApp coordination, or in-person visits is handled with strict medical confidentiality.
              </p>
              <p>
                <strong>2. Appointment Communication:</strong> Details submitted through the appointment request form are formatted directly into a secure WhatsApp message sent from the patient&apos;s own device. No clinical data is stored on public servers or sold to third-party marketing services.
              </p>
              <p>
                <strong>3. In-Person Medical Records:</strong> Official medical charts, prescriptions, and lab investigations are maintained confidentially in accordance with medical ethics and Pakistani healthcare regulatory standards.
              </p>
              <p>
                <strong>4. Contact for Concerns:</strong> If you have any inquiries regarding your data or consultation privacy, please contact the clinic directly at 0331 0283338.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
