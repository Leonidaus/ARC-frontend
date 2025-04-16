import React from 'react';
import { Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ContactInfo {
  email: string;
  location: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    strava?: string;
  };
}

interface ContactInfoBoxProps {
  contactInfo: ContactInfo;
  className?: string;
}

const ContactInfoBox = ({ contactInfo, className = '' }: ContactInfoBoxProps) => {
  return (
    <Card className={`overflow-hidden shadow-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-500/5 z-0" />
      
      <CardHeader className="relative z-10 border-b pb-4 pt-4">
        <CardTitle className="text-2xl font-bold text-center text-white">CONTACT US</CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-10">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {contactInfo.email}
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <p>{contactInfo.location}</p>
          </div>
          
          <div className="flex items-center gap-3">
          </div>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
          {contactInfo.socialLinks.instagram && (
            <a 
              href={contactInfo.socialLinks.instagram}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </a>
          )}
          
          {contactInfo.socialLinks.facebook && (
            <a 
              href={contactInfo.socialLinks.facebook}
              className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </a>
          )}
          
          {contactInfo.socialLinks.strava && (
            <a 
              href={contactInfo.socialLinks.strava}
              className="bg-orange-600 text-white flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
              <span>Strava</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoBox;