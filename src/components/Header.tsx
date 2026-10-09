import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Settings2 } from 'lucide-react';
import { ClinicLogo } from './ClinicLogo';
import { ClinicDetails } from '../types';

interface HeaderProps {
  clinic: ClinicDetails;
  onOpenAdmin: () => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  clinic,
  onOpenAdmin,
  onBookClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Appointments', href: '#appointments' },
    { label: 'Hours', href: '#hours' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3.5'
            : 'bg-white border-b border-slate-100 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark with Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-3 group whitespace-nowrap shrink-0 text-slate-900 focus-visible:outline-teal-700"
              aria-label="Dr. Ayesha Naveed Clinic - Home"
            >
              <ClinicLogo size="md" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
                  {clinic.name}
                </span>
                <span className="text-[11px] font-medium text-teal-700 tracking-wide uppercase">
                  Gulberg II · Lahore
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600"
              aria-label="Main Navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="hover:text-teal-800 transition-colors py-1 whitespace-nowrap shrink-0"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Action & Portal Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Doctor / Clinic Information Settings Button */}
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-teal-900 hover:bg-slate-100 rounded-md transition-colors"
                title="Clinic Info & Verification Manager"
                aria-label="Edit Clinic Details and Verification Status"
              >
                <Settings2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Clinic Info</span>
              </button>

              {/* Call Link on medium screens */}
              <a
                href={`tel:${clinic.phone}`}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-800 hover:bg-teal-50/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{clinic.phoneDisplay}</span>
              </a>

              {/* Primary Book Appointment Action Button */}
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 active:scale-[0.98] rounded-lg shadow-xs transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-teal-700"
              >
                <Calendar className="w-4 h-4 text-teal-200" />
                <span>Book Appointment</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-teal-700"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-800 rounded-md transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={`tel:${clinic.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Call Clinic: {clinic.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${clinic.whatsappNumber}?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20consultations%20at%20Dr.%20Ayesha%20Naveed%20Clinic.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
              >
                <span>WhatsApp: {clinic.whatsappDisplay}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors mt-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Clinic Info & Verification Status</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
