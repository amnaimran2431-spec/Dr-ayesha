import React from 'react';
import { MapPin, Navigation, Car, Shield, Compass, Phone } from 'lucide-react';
import { ClinicDetails } from '../types';

interface LocationSectionProps {
  clinic: ClinicDetails;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ clinic }) => {
  const encodedQuery = encodeURIComponent(
    `${clinic.name}, Plot 17, Block S, Gulberg II, Lahore, Pakistan`
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  
  // Safe Google Maps Embed URL for Lahore Gulberg II Block S
  const embedMapUrl = `https://maps.google.com/maps?q=Plot%2017%2C%20Block%20S%2C%20Gulberg%20II%2C%20Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 sm:py-24 bg-white text-slate-800 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase mb-2">
            Visit Our Clinic
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Clinic Location & Directions
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Situated in a quiet, accessible sector of Gulberg II, Lahore, providing a peaceful and private setting for your consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Address Card & Arrival Guidance */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Main Address Card */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-teal-900 text-teal-200 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {clinic.name}
                  </h3>
                  <div className="mt-2 text-sm text-slate-700 font-medium space-y-0.5">
                    <p>{clinic.street}</p>
                    <p>{clinic.area}</p>
                    <p>{clinic.city}, {clinic.country}</p>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2 border-t border-slate-200">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-teal-300" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

              {/* Quick Contact within location card */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                <span>Helpline for Directions:</span>
                <a
                  href={`tel:${clinic.phone}`}
                  className="font-semibold text-teal-800 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{clinic.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Arrival Information Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <Compass className="w-4 h-4 text-teal-700" />
                  <span>Landmark Access</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Accessible via Main Boulevard Gulberg, Jail Road, and near Block S residential streets.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <Car className="w-4 h-4 text-teal-700" />
                  <span>Parking & Arrival</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Dedicated street parking spaces available directly in front of Plot 17.
                </p>
              </div>
            </div>

            {/* Patient Privacy & Accessibility */}
            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 flex items-start gap-3">
              <Shield className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">
                <strong>Ground-Level Accessibility:</strong> Step-free entrance designed to accommodate senior patients and those with limited mobility.
              </p>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed Frame */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
              <iframe
                title="Google Maps Location of Dr. Ayesha Naveed Clinic, Plot 17, Block S, Gulberg II, Lahore"
                src={embedMapUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating map pin overlay tag */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs text-slate-800">
                <span className="font-bold text-teal-900 block">Dr. Ayesha Naveed Clinic</span>
                <span className="text-[11px] text-slate-600">Plot 17, Block S, Gulberg II, Lahore</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
