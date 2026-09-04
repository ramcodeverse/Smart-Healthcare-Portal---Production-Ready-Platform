import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { QrCode, Download, ExternalLink, ShieldCheck, Check, Copy, AlertCircle, Eye, Printer, Smartphone } from 'lucide-react';
import { Prescription } from '../../types';
import { getScannableVerificationUrl } from '../../utils/qrUtils';

interface MedicationQRCodeProps {
  prescription: Prescription;
  size?: number;
  showDetailsButton?: boolean;
  showActions?: boolean;
  onViewVerification?: (rx: Prescription) => void;
}

export const MedicationQRCode: React.FC<MedicationQRCodeProps> = ({
  prescription,
  size = 140,
  showDetailsButton = true,
  showActions = true,
  onViewVerification
}) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Scannable mobile URL that external devices can open directly without auth barriers
  const verificationUrl = getScannableVerificationUrl(
    prescription.rxNumber,
    prescription.medication,
    prescription.dosage,
    prescription.frequency,
    prescription.patientName,
    prescription.prescribedBy,
    prescription.refillsRemaining,
    prescription.verificationHash,
    prescription.ndcCode
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    // Use Level 'M' (Medium - 15%) for optimal scanning on smartphone cameras off digital displays
    QRCode.toCanvas(
      canvasRef.current,
      verificationUrl,
      {
        width: size,
        margin: 2,
        color: {
          dark: '#0f172a', // High-contrast Slate 900
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      },
      (error) => {
        if (error) {
          console.error('QR code generation error:', error);
          setRenderError('Failed to generate QR code');
        } else {
          setRenderError(null);
          if (canvasRef.current) {
            setQrDataUrl(canvasRef.current.toDataURL('image/png'));
          }
        }
      }
    );
  }, [prescription, size, verificationUrl]);

  // Download high-resolution label image with QR code + particulars
  const handleDownload = () => {
    try {
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = 600;
      offscreenCanvas.height = 700;
      const ctx = offscreenCanvas.getContext('2d');
      if (!ctx) return;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 600, 700);

      // Header Banner
      ctx.fillStyle = '#2563eb'; // Blue 600
      ctx.fillRect(0, 0, 600, 90);

      // Header Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('DIGITAL PRESCRIPTION VERIFIER', 30, 42);
      ctx.font = '14px sans-serif';
      ctx.fillText('Healthcare Portal Certified Medication QR', 30, 70);

      // Medication Title
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(prescription.medication, 30, 135);

      ctx.fillStyle = '#475569';
      ctx.font = '15px sans-serif';
      ctx.fillText(`Dosage: ${prescription.dosage} | Refills: ${prescription.refillsRemaining}`, 30, 165);
      ctx.fillText(`Patient: ${prescription.patientName} | Dr. ${prescription.prescribedBy}`, 30, 192);
      ctx.fillText(`Rx Number: ${prescription.rxNumber} | NDC: ${prescription.ndcCode}`, 30, 219);

      // Render large QR Code onto canvas
      QRCode.toCanvas(
        offscreenCanvas,
        verificationUrl,
        {
          width: 340,
          margin: 2,
          color: { dark: '#0f172a', light: '#ffffff' },
          errorCorrectionLevel: 'M'
        },
        () => {
          // Footer
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(0, 620, 600, 80);
          ctx.fillStyle = '#64748b';
          ctx.font = '13px sans-serif';
          ctx.fillText(`Security Seal: ${prescription.verificationHash}`, 30, 655);
          ctx.fillText('Scan with any mobile camera to verify authenticity & pharmacy records', 30, 678);

          const link = document.createElement('a');
          link.download = `${prescription.medication.replace(/\s+/g, '_')}_Rx_QRCode.png`;
          link.href = offscreenCanvas.toDataURL('image/png');
          link.click();
        }
      );
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenCertificate = () => {
    setModalOpen(false);
    if (onViewVerification) {
      onViewVerification(prescription);
    } else {
      navigate(`/verify-medication?rx=${encodeURIComponent(prescription.rxNumber)}`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        {/* Real QR Code Canvas */}
        <div className="relative group p-2 bg-white rounded-lg border border-gray-200 shadow-inner">
          <canvas
            ref={canvasRef}
            className="rounded cursor-pointer transition-transform group-hover:scale-105"
            onClick={() => setModalOpen(true)}
            title="Click to view high-resolution QR and medication details"
          />
          {renderError && (
            <div className="w-32 h-32 flex flex-col items-center justify-center text-xs text-red-600 p-2 text-center">
              <AlertCircle className="w-6 h-6 mb-1" />
              {renderError}
            </div>
          )}
          <button
            onClick={() => setModalOpen(true)}
            className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
          >
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded shadow font-medium flex items-center gap-1">
              <Eye className="w-3 h-3" /> Inspect
            </span>
          </button>
        </div>

        {/* Security badge & Quick Details Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 transition-colors"
          title="Click to inspect verified details"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Real Scannable QR</span>
        </button>

        {/* Actions */}
        {showActions && (
          <div className="mt-2.5 flex flex-col items-center gap-1.5 w-full">
            {showDetailsButton && (
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Show Details</span>
              </button>
            )}

            <div className="flex items-center gap-2 w-full justify-center text-xs text-gray-500 pt-0.5">
              <button
                onClick={handleDownload}
                title="Download QR code image (.png)"
                className="hover:text-blue-700 hover:bg-blue-50 px-2 py-0.5 rounded transition-colors flex items-center gap-1 font-medium"
              >
                <Download className="w-3 h-3" />
                <span>Save</span>
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={handleCopyUrl}
                title="Copy mobile verification link"
                className="hover:text-blue-700 hover:bg-blue-50 px-2 py-0.5 rounded transition-colors flex items-center gap-1 font-medium"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Medication Particulars & Large QR Inspector Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 rounded-t-2xl flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED MEDICATION
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{prescription.rxNumber}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5">{prescription.medication}</h3>
                <p className="text-sm text-slate-300">NDC: {prescription.ndcCode} • {prescription.dosage}</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* QR Code Presentation Box */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="bg-white p-3 rounded-xl border-2 border-blue-500/30 shadow-md flex flex-col items-center">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`Scannable QR for ${prescription.medication}`}
                      className="w-48 h-48 rounded"
                    />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-gray-400 animate-pulse" />
                    </div>
                  )}
                  <span className="mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-emerald-600" />
                    <span>Scan with Mobile Camera</span>
                  </span>
                </div>

                <div className="flex-1 space-y-2.5 text-sm">
                  <h4 className="font-semibold text-slate-900">Official Pharmacy QR Code</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Scan this QR code with any smartphone camera (iPhone, Android) or barcode reader. It immediately loads the certified digital prescription verification certificate on your mobile device.
                  </p>

                  {/* Public Scannable URL display */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Mobile Direct Link:</span>
                    <p className="text-[11px] text-blue-700 font-mono break-all line-clamp-2">
                      {verificationUrl}
                    </p>
                  </div>

                  <div className="pt-1 flex flex-wrap gap-2">
                    <button
                      onClick={handleOpenCertificate}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Full Certificate</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download QR (.PNG)
                    </button>
                    <button
                      onClick={handleCopyUrl}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied URL' : 'Copy Link'}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span>Print Label</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Particulars Grid */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">Medication Particulars & Instructions</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Dosage & Strength</p>
                    <p className="font-semibold text-gray-900 mt-0.5">{prescription.dosage}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Frequency</p>
                    <p className="font-semibold text-gray-900 mt-0.5">{prescription.frequency}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Refills Remaining</p>
                    <p className="font-semibold text-emerald-700 mt-0.5">
                      {prescription.refillsRemaining} of {prescription.totalRefillsAllowed}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Prescribing Physician</p>
                    <p className="font-semibold text-gray-900 mt-0.5">{prescription.prescribedBy}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Prescribed Date</p>
                    <p className="font-semibold text-gray-900 mt-0.5">{prescription.datePrescribed}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Valid Until</p>
                    <p className="font-semibold text-gray-900 mt-0.5">{prescription.expiresAt}</p>
                  </div>
                </div>

                {/* Instructions Box */}
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-blue-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Prescribed Intake Directions
                  </p>
                  <p className="text-blue-800 leading-relaxed pl-5.5">{prescription.instructions}</p>
                  {prescription.warningNote && (
                    <p className="text-amber-800 font-medium pl-5.5 pt-1">
                      ⚠️ Caution: {prescription.warningNote}
                    </p>
                  )}
                </div>

                {/* Digital Certificate Hash */}
                <div className="bg-slate-900 text-slate-300 p-3 rounded-xl text-xs font-mono flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">Cryptographic Audit Hash</span>
                    <span className="text-emerald-400 font-bold">{prescription.verificationHash}</span>
                  </div>
                  <span className="text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    SIGNED & TAMPER-PROOF
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Patient: <strong className="text-gray-800">{prescription.patientName}</strong>
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicationQRCode;
