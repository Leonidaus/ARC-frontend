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
              className="text-orange-600 hover:text-blue-800 transition-colors text-center"
            >
              {contactInfo.email}
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full text-center">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <p>{contactInfo.location}</p>
          </div>
          
          <div className="flex items-center gap-3">
          </div>
        </div>
        
        
      </CardContent>
    </Card>
  );
};

export default ContactInfoBox;