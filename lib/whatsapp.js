export const WHATSAPP_NUMBER = "919157487233";

export function generateWhatsAppUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text) {
  const url = generateWhatsAppUrl(text);
  window.open(url, "_blank");
}
