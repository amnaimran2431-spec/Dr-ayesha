import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { CLINIC_FAQS } from '../data/clinicData';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white text-slate-800 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Patient Information & Queries
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Clear details regarding consultations, clinic location, appointment scheduling, and patient policies.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {CLINIC_FAQS.map((faq: FaqItem) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-teal-700/30 bg-teal-50/20 shadow-xs'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-teal-700"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${
                      isOpen ? 'text-teal-700' : 'text-slate-400'
                    }`} />
                    <span className="text-sm sm:text-base font-semibold text-slate-900">
                      {faq.question}
                    </span>
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have another question? */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Have an unlisted question? Feel free to contact our clinic desk directly at{' '}
          <a href="tel:03310283338" className="font-semibold text-teal-800 hover:underline">
            0331 0283338
          </a>{' '}
          or message on WhatsApp.
        </div>

      </div>
    </section>
  );
};
