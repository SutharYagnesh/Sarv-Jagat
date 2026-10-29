'use client';

import { useState, useEffect } from 'react';

export const DEFAULT_COMPANY_INFO = {
  companyName: 'Sarv Jagat Corporation',
  address:
    'Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
  shortAddress:
    'Vinayak Industrial Estate - 2, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
  city: 'Ahmedabad',
  state: 'Gujarat',
  pincode: '382430',
  country: 'India',
  primaryPhone: '+91-9157487233',
  secondaryPhone: '+91-9157770753',
  primaryEmail: 'contact@sarvjagat.com',
  supportEmail: 'contact@sarvjagat.com',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  googleMapsUrl: 'https://maps.google.com/?q=Sarv+Jagat+Corporation+Kathwada+Ahmedabad',
};

export function useCompanyInfo() {
  const [companyInfo, setCompanyInfo] = useState(DEFAULT_COMPANY_INFO);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/company-info')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && isMounted) {
          setCompanyInfo((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => {
        console.error('Failed to load company info', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return companyInfo;
}
