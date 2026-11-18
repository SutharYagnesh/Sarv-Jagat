/**
 * Google Customer Reviews Opt-In Integration for Sarv Jagat Corporation
 * Merchant ID: 5892979250
 *
 * Renders the official Google Customer Reviews post-inquiry/order survey opt-in dialog.
 */
export function triggerGoogleCustomerReviewsOptIn({
  orderId,
  email,
  deliveryCountry = 'IN',
  estimatedDeliveryDays = 5,
  products = [],
}) {
  if (typeof window === 'undefined' || !email) return;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDeliveryDays);
  const yyyy = deliveryDate.getFullYear();
  const mm = String(deliveryDate.getMonth() + 1).padStart(2, '0');
  const dd = String(deliveryDate.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  const renderSurvey = () => {
    if (window.gapi && window.gapi.surveyoptin && typeof window.gapi.surveyoptin.render === 'function') {
      try {
        window.gapi.surveyoptin.render({
          merchant_id: 5892979250,
          order_id: String(orderId || `SJ-INQ-${Date.now()}`),
          email: String(email).trim().toLowerCase(),
          delivery_country: deliveryCountry || 'IN',
          estimated_delivery_date: dateStr,
          products: products.length > 0 ? products : undefined,
        });
      } catch (err) {
        console.warn('Google Customer Reviews Opt-in render error:', err);
      }
    }
  };

  if (!window.gapi) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
    script.async = true;
    script.defer = true;
    window.renderOptIn = function () {
      window.gapi.load('surveyoptin', function () {
        renderSurvey();
      });
    };
    document.body.appendChild(script);
  } else {
    window.gapi.load('surveyoptin', function () {
      renderSurvey();
    });
  }
}

