'use client';

import { useEffect } from 'react';

export function GoogleCustomerReviewsBadge({
  merchantId = '5892979250',
  position = 'BOTTOM_LEFT',
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const existingScript = document.getElementById('merchantWidgetScript');

      const initBadge = () => {
        if (window.merchantwidget && typeof window.merchantwidget.start === 'function') {
          window.merchantwidget.start({
            merchant_id: Number(merchantId) || 5892979250,
            position: position || 'BOTTOM_LEFT',
            region: 'IN',
          });
        }
      };

      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'merchantWidgetScript';
        script.src = 'https://www.gstatic.com/shopping/merchant/merchantwidget.js';
        script.defer = true;
        script.addEventListener('load', initBadge);
        document.body.appendChild(script);
      } else {
        initBadge();
      }
    } catch (e) {
      console.warn('Google Customer Reviews badge could not be initialized:', e);
    }
  }, [merchantId, position]);

  return null;
}

