import React, { useState } from 'react';
import { PhoneCall, Send, CheckCircle2, MapPin, MessageSquare } from 'lucide-react';
import { LanguageCode, ScanRecord } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { KVK_EXPERTS } from '../data/agriDatabase';

interface ExpertHelpPageProps {
  language: LanguageCode;
  scanHistory: ScanRecord[];
}

export const ExpertHelpPage: React.FC<ExpertHelpPageProps> = ({
  language,
  scanHistory,
}) => {
  const t = TRANSLATIONS[language];
  const [farmerName, setFarmerName] = useState('');
  const [villageDistrict, setVillageDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedScanId, setSelectedScanId] = useState(scanHistory[0]?.id || '');
  const [question, setQuestion] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim()) return;
    const ticketId = `KVK-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedTicket(ticketId);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <p className="text-xs font-medium text-emerald-800 hc-text-muted">
          ICAR Extension Network & Toll-Free Kisan Call Centre Integration
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 hc-surface">
          {t.expertTitle}
        </h1>
        <p className="text-sm text-stone-600 hc-text-muted">{t.kccBannerText}</p>
      </div>

      {/* Two-Column Layout: Regional KVK Directory + Consultation Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Verified KVK Plant Protection Scientists */}
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-lg font-bold text-stone-900 hc-surface">
            01. Regional Krishi Vigyan Kendra (KVK) Specialists
          </h2>

          <div className="space-y-4">
            {KVK_EXPERTS.map((expert) => (
              <div
                key={expert.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 hc-surface"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500 hc-text-muted">
                      <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                      <span>
                        {expert.district}, {expert.state}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Languages: {expert.languages.join(', ')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 hc-surface">{expert.name}</h3>
                    <p className="text-xs font-semibold text-emerald-900 hc-text-muted">
                      {expert.role} · {expert.institution}
                    </p>
                  </div>

                  <a
                    href="tel:18001801551"
                    className="min-h-[44px] px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg inline-flex items-center gap-2 self-start whitespace-nowrap shrink-0 hc-cta"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{expert.phone}</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600 hc-text-muted">
                  <span>
                    <strong>Specialization:</strong> {expert.specialization}
                  </span>
                  <span className="font-mono-tabular text-emerald-800 font-semibold">
                    {expert.availability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Forward Scan Report for Scientist Callback */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 space-y-6 hc-surface">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
              <MessageSquare className="w-4 h-4" />
              <span>Direct Extension Ticket</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 hc-surface">
              02. Send Scan Log for Agronomist Callback
            </h2>
            <p className="text-xs text-stone-600 hc-text-muted">
              Attach a recent leaf scan from your history and receive a voice or SMS prescription in your regional language.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 space-y-4 text-emerald-950 hc-surface">
              <div className="flex items-center gap-2 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Advisory Ticket Registered: {submittedTicket}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                Thank you, <strong>{farmerName}</strong>. Your leaf scan report (<strong>{selectedScanId || 'Field Inquiry'}</strong>) has been queued for the regional KVK Plant Protection Scientist in <strong>{villageDistrict || 'your district'}</strong>. Expect a callback on <span className="font-mono-tabular font-semibold">{phone}</span> within 4 working hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedTicket(null);
                  setQuestion('');
                }}
                className="min-h-[44px] px-4 py-2 bg-emerald-900 text-white text-xs font-bold rounded-lg cursor-pointer hc-cta"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label htmlFor="farmer-name" className="block text-xs font-semibold text-stone-700 mb-1 hc-text-muted">
                  Farmer Full Name *
                </label>
                <input
                  id="farmer-name"
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g., Ramesh Kumar / முருகன்"
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus-visible:outline-2 focus-visible:outline-emerald-800 hc-surface"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="farmer-phone" className="block text-xs font-semibold text-stone-700 mb-1 hc-text-muted">
                    Mobile Number (10-digit) *
                  </label>
                  <input
                    id="farmer-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full min-h-[44px] px-3.5 py-2 text-sm font-mono-tabular bg-stone-50 border border-stone-300 rounded-lg focus-visible:outline-2 focus-visible:outline-emerald-800 hc-surface"
                  />
                </div>

                <div>
                  <label htmlFor="farmer-district" className="block text-xs font-semibold text-stone-700 mb-1 hc-text-muted">
                    Village & District
                  </label>
                  <input
                    id="farmer-district"
                    type="text"
                    value={villageDistrict}
                    onChange={(e) => setVillageDistrict(e.target.value)}
                    placeholder="e.g., Papanasam, Thanjavur"
                    className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus-visible:outline-2 focus-visible:outline-emerald-800 hc-surface"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="attach-scan" className="block text-xs font-semibold text-stone-700 mb-1 hc-text-muted">
                  Attach Saved Leaf Scan Record
                </label>
                <select
                  id="attach-scan"
                  value={selectedScanId}
                  onChange={(e) => setSelectedScanId(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg hc-surface"
                >
                  {scanHistory.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id} · {s.cropName} — {s.prediction.diseaseName} ({s.prediction.confidence}%)
                    </option>
                  ))}
                  <option value="NONE">No scan attached (General agronomic query)</option>
                </select>
              </div>

              <div>
                <label htmlFor="farmer-question" className="block text-xs font-semibold text-stone-700 mb-1 hc-text-muted">
                  Describe Field Condition / Crop Age (Days After Sowing)
                </label>
                <textarea
                  id="farmer-question"
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., Crop is 42 days old, standing water is 3 inches, yellow spots spreading near canal bund..."
                  className="w-full p-3.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus-visible:outline-2 focus-visible:outline-emerald-800 hc-surface"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer hc-cta"
              >
                <Send className="w-4 h-4" />
                <span>Request Free KVK Scientist Callback</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
