import { ClinicDetails, FaqItem } from '../types';

export const INITIAL_CLINIC_DATA: ClinicDetails = {
  name: 'Dr. Ayesha Naveed Clinic',
  shortName: 'Dr. Ayesha Naveed Clinic',
  street: 'Plot 17, Block S',
  block: 'Block S',
  area: 'Gulberg II',
  city: 'Lahore',
  country: 'Pakistan',
  phone: '03310283338',
  phoneDisplay: '0331 0283338',
  whatsappNumber: '923310283338',
  whatsappDisplay: '+92 331 0283338',
  googleMapsQuery: 'Dr Ayesha Naveed Clinic Plot 17 Block S Gulberg II Lahore Pakistan',
  doctor: {
    name: 'Dr. Ayesha Naveed',
    title: 'Consultant Physician / Medical Practitioner',
    qualifications: '', // Unverified by default - kept empty/editable
    specialization: '', // Unverified by default - kept empty/editable
    pmdcNumber: '', // Unverified by default - kept empty/editable
    experienceYears: '', // Unverified by default - kept empty/editable
    languages: ['Urdu', 'English', 'Punjabi'],
    isQualificationsVerified: false,
    isSpecializationVerified: false,
    isRegistrationVerified: false,
    isExperienceVerified: false,
    notes: 'Official credentials, postgraduate degrees, and PMDC verification status can be updated directly by clinic administration.'
  },
  hours: {
    isHoursConfirmed: false, // Keep actual hours hidden until confirmed
    byAppointmentOnly: true,
    days: [
      { day: 'Monday', timeSlot: 'Consultation By Prior Appointment', isOpen: true, statusLabel: 'By Appointment' },
      { day: 'Tuesday', timeSlot: 'Consultation By Prior Appointment', isOpen: true, statusLabel: 'By Appointment' },
      { day: 'Wednesday', timeSlot: 'Consultation By Prior Appointment', isOpen: true, statusLabel: 'By Appointment' },
      { day: 'Thursday', timeSlot: 'Consultation By Prior Appointment', isOpen: true, statusLabel: 'By Appointment' },
      { day: 'Friday', timeSlot: 'Consultation By Prior Appointment', isOpen: true, statusLabel: 'By Appointment' },
      { day: 'Saturday', timeSlot: 'Consultation By Prior Appointment', isOpen: true, statusLabel: 'By Appointment' },
      { day: 'Sunday', timeSlot: 'Closed / Inquiries via WhatsApp', isOpen: false, statusLabel: 'Closed' },
    ],
    notice: 'Please call or WhatsApp 0331 0283338 prior to visiting to confirm current consultation availability and book your reserved time slot.'
  },
  services: [
    {
      id: 'medical-consultations',
      title: 'Medical Consultations',
      description: 'One-on-one medical evaluation and diagnostic discussions focusing on individualized patient symptoms and treatment pathways.',
      keyPoints: [
        'Detailed medical history evaluation',
        'Direct physician consultation',
        'Confidential and personalized care plans'
      ],
      isConfirmed: true,
      badge: 'Core Service'
    },
    {
      id: 'patient-assessments',
      title: 'Patient Assessments',
      description: 'Thorough clinical assessment of general health status, vitals, ongoing symptoms, and overall baseline wellness.',
      keyPoints: [
        'Vitals and baseline symptom review',
        'Physical examination assessment',
        'Initial diagnostic triage'
      ],
      isConfirmed: true,
      badge: 'Core Service'
    },
    {
      id: 'follow-up-consultations',
      title: 'Follow-up Consultations',
      description: 'Structured follow-up reviews to examine treatment response, evaluate test reports, and refine continuing medical management.',
      keyPoints: [
        'Lab report and investigation review',
        'Treatment response evaluation',
        'Medication adjustment and guidance'
      ],
      isConfirmed: true,
      badge: 'Follow-Up'
    },
    {
      id: 'preventive-healthcare',
      title: 'Preventive Healthcare Guidance',
      description: 'Proactive medical recommendations and health lifestyle counsel designed to mitigate risk factors and sustain wellbeing.',
      keyPoints: [
        'Age-appropriate health screenings advice',
        'Nutritional and lifestyle recommendations',
        'Chronic condition risk mitigation'
      ],
      isConfirmed: true,
      badge: 'Preventive'
    },
    {
      id: 'general-health-advice',
      title: 'General Health Advice',
      description: 'Reliable, evidence-informed guidance on day-to-day health questions, medication protocols, and referral guidance.',
      keyPoints: [
        'Evidence-grounded medical counsel',
        'Safe medication usage review',
        'Specialist referral coordination when required'
      ],
      isConfirmed: true,
      badge: 'Guidance'
    }
  ]
};

export const CLINIC_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Appointments',
    question: 'How do I book an appointment at Dr. Ayesha Naveed Clinic?',
    answer: 'You can submit an appointment request using our website form or contact us directly on WhatsApp at +92 331 0283338 or by calling 0331 0283338. Our clinic coordination staff will check availability and confirm your scheduled time slot.'
  },
  {
    id: 'faq-2',
    category: 'Location',
    question: 'Where is Dr. Ayesha Naveed Clinic located?',
    answer: 'The clinic is located at Plot 17, Block S, Gulberg II, Lahore, Pakistan. It is conveniently accessible from Main Boulevard Gulberg, Jail Road, and MM Alam Road. You can click the "Get Directions" button on this website to view the exact location in Google Maps.'
  },
  {
    id: 'faq-3',
    category: 'Appointments',
    question: 'Are walk-in consultations accepted?',
    answer: 'To ensure every patient receives dedicated attention without prolonged waiting times, consultations are scheduled primarily by prior appointment. We strongly recommend calling 0331 0283338 or messaging on WhatsApp before visiting.'
  },
  {
    id: 'faq-4',
    category: 'Services',
    question: 'What services are provided at the clinic?',
    answer: 'The clinic provides personalized medical consultations, comprehensive patient assessments, follow-up evaluations, preventive healthcare guidance, and general health advice. For specific procedures or specialized diagnostic services, please inquire with our clinic desk.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'What should I bring to my consultation?',
    answer: 'Please bring any previous medical reports, recent lab test results, imaging reports, a list of current prescriptions or medications you are taking, and a valid national ID (CNIC).'
  },
  {
    id: 'faq-6',
    category: 'Appointments',
    question: 'What is the clinic policy regarding emergency cases?',
    answer: 'Dr. Ayesha Naveed Clinic is an outpatient consultation facility. For acute medical emergencies requiring urgent critical care, please contact emergency rescue services (1122) or visit the nearest tertiary hospital emergency department immediately.'
  }
];
