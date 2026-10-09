/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_CLINIC_DATA } from './data/clinicData';
import { ClinicDetails } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { AppointmentSection } from './components/AppointmentSection';
import { OpeningHoursSection } from './components/OpeningHoursSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ClinicAdminModal } from './components/ClinicAdminModal';
import { MessageSquare, Phone } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'dr_ayesha_naveed_clinic_data_v1';

export default function App() {
  const [clinicData, setClinicData] = useState<ClinicDetails>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read stored clinic data', e);
    }
    return INITIAL_CLINIC_DATA;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleSaveClinicData = (updated: ClinicDetails) => {
    setClinicData(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist clinic data', e);
    }
  };

  const handleResetClinicData = () => {
    setClinicData(INITIAL_CLINIC_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear stored clinic data', e);
    }
    setIsAdminOpen(false);
  };

  const scrollToAppointments = () => {
    const el = document.getElementById('appointments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <Header
        clinic={clinicData}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onBookClick={scrollToAppointments}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero clinic={clinicData} onBookClick={scrollToAppointments} />

        {/* 3. About the Clinic */}
        <AboutSection clinic={clinicData} onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* 4. Medical Services */}
        <ServicesSection clinic={clinicData} onBookClick={scrollToAppointments} />

        {/* 5. Appointment Booking */}
        <AppointmentSection clinic={clinicData} />

        {/* 6. Opening Hours */}
        <OpeningHoursSection clinic={clinicData} onBookClick={scrollToAppointments} />

        {/* 7. Clinic Location */}
        <LocationSection clinic={clinicData} />

        {/* 8. Contact Section */}
        <ContactSection clinic={clinicData} />

        {/* 9. FAQ Section */}
        <FaqSection />
      </main>

      {/* 10. Footer */}
      <Footer clinic={clinicData} onBookClick={scrollToAppointments} />

      {/* Floating Action Bar on Mobile / Desktop for direct WhatsApp and Calling */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5">
        <a
          href={`https://wa.me/${clinicData.whatsappNumber}?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20consultations%20at%20${encodeURIComponent(clinicData.name)}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg rounded-full hover:scale-105 active:scale-95 transition-all"
          aria-label="Direct WhatsApp message to clinic"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </div>

      {/* Clinic Information & Credentials Admin Modal */}
      <ClinicAdminModal
        clinic={clinicData}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSave={handleSaveClinicData}
        onReset={handleResetClinicData}
      />
    </div>
  );
}
