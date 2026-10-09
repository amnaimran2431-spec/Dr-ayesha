export interface DoctorProfile {
  name: string;
  title: string;
  qualifications: string;
  specialization: string;
  pmdcNumber: string;
  experienceYears: string;
  languages: string[];
  isQualificationsVerified: boolean;
  isSpecializationVerified: boolean;
  isRegistrationVerified: boolean;
  isExperienceVerified: boolean;
  notes: string;
}

export interface DaySchedule {
  day: string;
  timeSlot: string;
  isOpen: boolean;
  statusLabel?: string;
}

export interface ClinicHours {
  isHoursConfirmed: boolean;
  byAppointmentOnly: boolean;
  days: DaySchedule[];
  notice: string;
}

export interface ClinicService {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  isConfirmed: boolean;
  badge?: string;
}

export interface ClinicDetails {
  name: string;
  shortName: string;
  street: string;
  block: string;
  area: string;
  city: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  googleMapsQuery: string;
  doctor: DoctorProfile;
  hours: ClinicHours;
  services: ClinicService[];
}

export interface AppointmentFormData {
  patientName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  reasonForVisit: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Appointments' | 'Location' | 'Services' | 'General';
}
