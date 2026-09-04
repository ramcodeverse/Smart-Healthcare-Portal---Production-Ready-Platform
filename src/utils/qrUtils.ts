/**
 * Utility to generate public, smartphone-scannable URLs for medication QR codes.
 * In AI Studio, converting 'ais-dev-' to 'ais-pre-' allows any external
 * mobile phone (iPhone, Android) or other device on cellular or external WiFi
 * to open and display the verified prescription certificate without authentication barriers.
 */
export function getScannableVerificationUrl(
  rxNumber: string,
  medication?: string,
  dosage?: string,
  frequency?: string,
  patientName?: string,
  prescribedBy?: string,
  refills?: number | string,
  hash?: string,
  ndc?: string
): string {
  // Default to the shared public app preview origin
  let origin = 'https://ais-pre-vcrnpvnnybqqpajelhlo7d-528799930423.asia-east1.run.app';

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const currentOrigin = window.location.origin;
    if (currentOrigin.includes('ais-dev-')) {
      // Convert development URL to public preview URL for other devices
      origin = currentOrigin.replace('ais-dev-', 'ais-pre-');
    } else if (!currentOrigin.includes('localhost') && currentOrigin.startsWith('http')) {
      origin = currentOrigin;
    }
  }

  const params = new URLSearchParams();
  params.set('rx', rxNumber);
  if (medication) params.set('m', medication);
  if (dosage) params.set('d', dosage);
  if (frequency) params.set('f', frequency);
  if (patientName) params.set('p', patientName);
  if (prescribedBy) params.set('doc', prescribedBy);
  if (refills !== undefined && refills !== null) params.set('r', refills.toString());
  if (hash) params.set('h', hash);
  if (ndc) params.set('ndc', ndc);

  return `${origin}/verify-medication?${params.toString()}`;
}

export function getPublicSharedOrigin(): string {
  let origin = 'https://ais-pre-vcrnpvnnybqqpajelhlo7d-528799930423.asia-east1.run.app';
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const currentOrigin = window.location.origin;
    if (currentOrigin.includes('ais-dev-')) {
      origin = currentOrigin.replace('ais-dev-', 'ais-pre-');
    } else if (!currentOrigin.includes('localhost') && currentOrigin.startsWith('http')) {
      origin = currentOrigin;
    }
  }
  return origin;
}
