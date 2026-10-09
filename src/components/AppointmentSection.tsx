import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, FileText, Send, CheckCircle, Copy, AlertCircle, ExternalLink } from 'lucide-react';
import { ClinicDetails, AppointmentFormData } from '../types';

interface AppointmentSectionProps {
  clinic: ClinicDetails;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ clinic }) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: 'Morning (11:00 AM - 1:30 PM)',
    reasonForVisit: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);
  const [generatedMessageText, setGeneratedMessageText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Time slot options
  const timeSlots = [
    'Morning (11:00 AM - 1:30 PM)',
    'Afternoon (2:30 PM - 5:00 PM)',
    'Evening (6:00 PM - 8:30 PM)',
    'Flexible / Any Available Slot',
  ];

  // Calculate today's date formatted as YYYY-MM-DD for min date attribute
  const todayFormatted = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AppointmentFormData, string>> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Please enter the patient name.';
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Patient name must be at least 2 characters.';
    }

    // Phone validation (accepting standard Pakistani mobile formats e.g. 03310283338, 0331-0283338, +923310283338)
    const cleanedPhone = formData.phoneNumber.replace(/[\s-]/g, '');
    if (!cleanedPhone) {
      newErrors.phoneNumber = 'Please enter a contact phone number.';
    } else if (!/^(03\d{9}|\+?923\d{9})$/.test(cleanedPhone) && cleanedPhone.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid mobile number (e.g. 0331 0283338).';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Exactly matching the prompt prefill requirement:
    // “Assalam-o-Alaikum, I would like to request an appointment at Dr. Ayesha Naveed Clinic. Name: [name]. Preferred date: [date]. Preferred time: [time]. Please let me know the available appointment times.”
    const reasonPart = formData.reasonForVisit.trim()
      ? ` Reason: ${formData.reasonForVisit.trim()}.`
      : '';

    const prefillMessage = `Assalam-o-Alaikum, I would like to request an appointment at Dr. Ayesha Naveed Clinic. Name: ${formData.patientName.trim()}. Preferred date: ${formData.preferredDate}. Preferred time: ${formData.preferredTime}.${reasonPart} Please let me know the available appointment times.`;

    const encodedMessage = encodeURIComponent(prefillMessage);
    const waUrl = `https://wa.me/${clinic.whatsappNumber}?text=${encodedMessage}`;

    setGeneratedMessageText(prefillMessage);
    setSubmittedWhatsAppUrl(waUrl);

    // Open WhatsApp in a new tab immediately for smooth user flow
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = async () => {
    if (generatedMessageText) {
      try {
        await navigator.clipboard.writeText(generatedMessageText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Copy failed', err);
      }
    }
  };

  const resetForm = () => {
    setSubmittedWhatsAppUrl(null);
    setGeneratedMessageText('');
    setFormData({
      patientName: '',
      phoneNumber: '',
      preferredDate: '',
      preferredTime: 'Morning (11:00 AM - 1:30 PM)',
      reasonForVisit: '',
    });
    setErrors({});
  };

  return (
    <section id="appointments" className="py-16 sm:py-24 bg-white text-slate-800 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase mb-2">
            Schedule a Visit
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Request an Appointment
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Fill in your preferred date and time. Your request is formatted directly for our clinic WhatsApp coordination team to review and confirm.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          
          {/* Submission Success State */}
          {submittedWhatsAppUrl ? (
            <div className="bg-teal-50/70 border border-teal-200/90 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-teal-600 text-white rounded-xl shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-teal-950">
                    Appointment Request Formatted
                  </h3>
                  <p className="text-sm text-teal-900/80 mt-1">
                    Your request message has been prepared for <span className="font-semibold">{clinic.name}</span>.
                  </p>
                </div>
              </div>

              {/* Crucial transparency notice: never claim auto-confirmed */}
              <div className="bg-white/90 border border-teal-200 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-700">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">
                    Important Booking Notice:
                  </span>
                  Appointments are not automatically confirmed. The clinic team verifies doctor availability and replies via WhatsApp or phone to confirm your exact appointment slot.
                </div>
              </div>

              {/* Message preview box */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 mb-2">
                  <span className="font-medium">Prepared WhatsApp Message:</span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-mono bg-slate-50 p-3 rounded-lg leading-relaxed select-all">
                  {generatedMessageText}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={submittedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-xs"
                >
                  <span>Open WhatsApp to Send Request</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  Submit Another Request
                </button>
              </div>

              <div className="text-center text-xs text-slate-500 pt-1">
                Prefer calling? Dial directly: <a href={`tel:${clinic.phone}`} className="font-semibold text-teal-800 hover:underline">{clinic.phoneDisplay}</a>
              </div>
            </div>
          ) : (
            
            /* Standard Booking Form */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Patient Name */}
                <div className="sm:col-span-1">
                  <label htmlFor="patientName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) => {
                        setFormData({ ...formData, patientName: e.target.value });
                        if (errors.patientName) setErrors({ ...errors, patientName: undefined });
                      }}
                      placeholder="e.g. Fatima Ali"
                      aria-invalid={!!errors.patientName}
                      aria-describedby={errors.patientName ? 'patientName-error' : undefined}
                      className={`block w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-xl placeholder:text-slate-400 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 ${
                        errors.patientName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-teal-700'
                      }`}
                    />
                  </div>
                  {errors.patientName && (
                    <p id="patientName-error" className="text-xs text-rose-600 mt-1">
                      {errors.patientName}
                    </p>
                  )}
                </div>

                {/* Contact Phone */}
                <div className="sm:col-span-1">
                  <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, phoneNumber: e.target.value });
                        if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                      }}
                      placeholder="0331 XXXXXXX"
                      aria-invalid={!!errors.phoneNumber}
                      aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
                      className={`block w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-xl placeholder:text-slate-400 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 ${
                        errors.phoneNumber ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-teal-700'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p id="phoneNumber-error" className="text-xs text-rose-600 mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div className="sm:col-span-1">
                  <label htmlFor="preferredDate" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      id="preferredDate"
                      min={todayFormatted}
                      value={formData.preferredDate}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredDate: e.target.value });
                        if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
                      }}
                      aria-invalid={!!errors.preferredDate}
                      aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                      className={`block w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-xl text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 ${
                        errors.preferredDate ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-teal-700'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p id="preferredDate-error" className="text-xs text-rose-600 mt-1">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* Preferred Time Slot */}
                <div className="sm:col-span-1">
                  <label htmlFor="preferredTime" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Time Slot <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredTime: e.target.value });
                        if (errors.preferredTime) setErrors({ ...errors, preferredTime: undefined });
                      }}
                      className="block w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.preferredTime && (
                    <p id="preferredTime-error" className="text-xs text-rose-600 mt-1">
                      {errors.preferredTime}
                    </p>
                  )}
                </div>

                {/* Optional Reason for Visit */}
                <div className="sm:col-span-2">
                  <label htmlFor="reasonForVisit" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Reason for Visit <span className="text-slate-400 font-normal">(Optional / Confidential)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <textarea
                      id="reasonForVisit"
                      rows={3}
                      value={formData.reasonForVisit}
                      onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
                      placeholder="Brief description of symptoms, routine checkup, or follow-up report review..."
                      className="block w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 resize-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Your details are handled with medical confidentiality.
                  </p>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 active:scale-[0.99] rounded-xl shadow-xs transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-700"
                >
                  <Send className="w-4 h-4 text-teal-300" />
                  <span>Submit Request via WhatsApp</span>
                </button>
              </div>

              {/* Note below form */}
              <div className="flex items-start gap-2 pt-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700 shrink-0">Note:</span>
                <span>
                  Dr. Ayesha Naveed Clinic confirms consultations individually. Once submitted, our reception coordinates the exact timing via WhatsApp at +92 331 0283338.
                </span>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
