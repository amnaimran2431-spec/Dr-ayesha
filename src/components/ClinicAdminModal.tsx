import React, { useState } from 'react';
import { X, Check, RotateCcw, ShieldCheck, AlertCircle } from 'lucide-react';
import { ClinicDetails } from '../types';

interface ClinicAdminModalProps {
  clinic: ClinicDetails;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: ClinicDetails) => void;
  onReset: () => void;
}

export const ClinicAdminModal: React.FC<ClinicAdminModalProps> = ({
  clinic,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ClinicDetails>(clinic);
  const [activeTab, setActiveTab] = useState<'doctor' | 'hours' | 'clinic'>('doctor');
  const [saveNotification, setSaveNotification] = useState(false);

  if (!isOpen) return null;

  const handleDoctorChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        [field]: value,
      },
    }));
  };

  const handleHoursChange = (index: number, timeSlot: string, isOpen: boolean) => {
    setFormData((prev) => {
      const newDays = [...prev.hours.days];
      newDays[index] = {
        ...newDays[index],
        timeSlot,
        isOpen,
      };
      return {
        ...prev,
        hours: {
          ...prev.hours,
          days: newDays,
        },
      };
    });
  };

  const handleSave = () => {
    onSave(formData);
    setSaveNotification(true);
    setTimeout(() => {
      setSaveNotification(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <h2 id="admin-modal-title" className="text-base font-bold text-white">
                Clinic Information & Verification Manager
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Edit doctor qualifications, specialization, and clinic schedule when confirmed.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close Manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('doctor')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'doctor'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Doctor Credentials & Specialization
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hours')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'hours'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Opening Hours & Timings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clinic')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'clinic'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Clinic Details & Contact
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 flex-1">
          
          {/* TAB 1: Doctor Credentials */}
          {activeTab === 'doctor' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-xl flex items-start gap-2.5 text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Ethical Medical Notice:</strong> Unverified doctor credentials remain hidden on the public site until explicitly verified by the clinic. You can enter and toggle them here.
                </span>
              </div>

              {/* Doctor Name */}
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Doctor Verified Name
                </label>
                <input
                  type="text"
                  value={formData.doctor.name}
                  onChange={(e) => handleDoctorChange('name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>

              {/* Qualifications */}
              <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800">
                    Medical Degrees & Qualifications (e.g. MBBS, FCPS)
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.doctor.isQualificationsVerified}
                      onChange={(e) => handleDoctorChange('isQualificationsVerified', e.target.checked)}
                      className="rounded text-teal-700 focus:ring-teal-700"
                    />
                    <span className="text-[11px] font-medium text-slate-700">Display as Verified</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="e.g. MBBS, FCPS (Medicine)"
                  value={formData.doctor.qualifications}
                  onChange={(e) => handleDoctorChange('qualifications', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
                <p className="text-[10px] text-slate-500">
                  Leave empty or uncheck if doctor&apos;s degrees are still awaiting verification.
                </p>
              </div>

              {/* Specialization */}
              <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800">
                    Specialization / Clinical Sub-specialty
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.doctor.isSpecializationVerified}
                      onChange={(e) => handleDoctorChange('isSpecializationVerified', e.target.checked)}
                      className="rounded text-teal-700 focus:ring-teal-700"
                    />
                    <span className="text-[11px] font-medium text-slate-700">Display as Verified</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Consultant Physician / Family Medicine"
                  value={formData.doctor.specialization}
                  onChange={(e) => handleDoctorChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>

              {/* PMDC / Registration */}
              <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800">
                    PMDC / PMC Registration Number
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.doctor.isRegistrationVerified}
                      onChange={(e) => handleDoctorChange('isRegistrationVerified', e.target.checked)}
                      className="rounded text-teal-700 focus:ring-teal-700"
                    />
                    <span className="text-[11px] font-medium text-slate-700">Display as Verified</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 12345-P"
                  value={formData.doctor.pmdcNumber}
                  onChange={(e) => handleDoctorChange('pmdcNumber', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>

              {/* Languages */}
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Consultation Languages (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.doctor.languages.join(', ')}
                  onChange={(e) =>
                    handleDoctorChange(
                      'languages',
                      e.target.value.split(',').map((l) => l.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Opening Hours */}
          {activeTab === 'hours' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-xl">
                <div>
                  <span className="font-bold text-teal-950 block">Confirm Weekly Operating Hours</span>
                  <span className="text-[11px] text-teal-800">
                    Toggle to display specific times publicly instead of &quot;By Prior Appointment&quot;.
                  </span>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hours.isHoursConfirmed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hours: { ...formData.hours, isHoursConfirmed: e.target.checked },
                      })
                    }
                    className="rounded text-teal-700"
                  />
                  <span className="text-xs font-semibold text-teal-900">Publish Hours</span>
                </label>
              </div>

              <div className="space-y-2">
                {formData.hours.days.map((dayItem, idx) => (
                  <div
                    key={dayItem.day}
                    className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg gap-3"
                  >
                    <span className="font-semibold w-24 text-slate-800">{dayItem.day}</span>
                    <input
                      type="text"
                      value={dayItem.timeSlot}
                      onChange={(e) => handleHoursChange(idx, e.target.value, dayItem.isOpen)}
                      placeholder="e.g. 5:00 PM - 8:30 PM"
                      className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900"
                    />
                    <label className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={dayItem.isOpen}
                        onChange={(e) => handleHoursChange(idx, dayItem.timeSlot, e.target.checked)}
                        className="rounded text-teal-700"
                      />
                      <span>Open</span>
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Visitor Booking Notice
                </label>
                <textarea
                  rows={2}
                  value={formData.hours.notice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hours: { ...formData.hours, notice: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Clinic Details & Contact */}
          {activeTab === 'clinic' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-slate-600 text-xs">
                <p>
                  <strong>Verified Clinic Facts:</strong>
                </p>
                <p>Clinic Name: {clinic.name}</p>
                <p>Address: Plot 17, Block S, Gulberg II, Lahore, Pakistan</p>
                <p>Phone: {clinic.phoneDisplay}</p>
                <p>WhatsApp: {clinic.whatsappDisplay}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Phone Display Format
                </label>
                <input
                  type="text"
                  value={formData.phoneDisplay}
                  onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  WhatsApp Display Format
                </label>
                <input
                  type="text"
                  value={formData.whatsappDisplay}
                  onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{saveNotification ? 'Saved!' : 'Save & Update Site'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
