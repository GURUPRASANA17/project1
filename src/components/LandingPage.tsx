import React from 'react';
import { Camera, ArrowRight, Volume2, PhoneCall, CheckCircle2 } from 'lucide-react';
import { CropId, LanguageCode, NavTab } from '../types/agri';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { CROPS_LIST, HERO_IMAGE_URL } from '../data/agriDatabase';

interface LandingPageProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  setActiveTab: (tab: NavTab) => void;
  onQuickStartCropScan: (cropId: CropId) => void;
  onSpeakText: (text: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  setLanguage,
  setActiveTab,
  onQuickStartCropScan,
  onSpeakText,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section with High-Fidelity Visual & Measured Scrim */}
      <section className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950">
          <img
            src={HERO_IMAGE_URL}
            alt="Lush Indian rice paddy and vegetable terraces at sunrise with solar soil sensor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-55 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 py-14 sm:px-12 sm:py-20 space-y-6">
          {/* Quiet unboxed kicker metadata */}
          <p className="text-xs sm:text-sm text-emerald-300 font-medium tracking-wide">
            {t.heroKicker}
          </p>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Dominant CTA Anchor + Secondary Action */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('scan')}
              className="min-h-[48px] px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base rounded-xl flex items-center gap-2.5 transition-transform active:scale-[0.99] shadow-lg whitespace-nowrap hc-cta cursor-pointer"
            >
              <Camera className="w-5 h-5 shrink-0" />
              <span>{t.ctaCheckCrop}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="min-h-[48px] px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs border border-white/30 text-white font-semibold text-base rounded-xl transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.heroSecondaryCta}
            </button>

            <button
              type="button"
              onClick={() => onSpeakText(`${t.heroTitle}. ${t.heroSubtitle}`)}
              className="min-h-[48px] px-4 py-3.5 bg-stone-900/80 hover:bg-stone-800 border border-stone-600 text-stone-200 text-sm font-medium rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.voiceReadPage}</span>
            </button>
          </div>

          {/* Claim-to-Proof Adjacency Bar */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div>
              <div className="font-mono-tabular text-2xl font-bold text-amber-400">8 Crops · 12+ Pathogens</div>
              <p className="text-xs text-stone-300 mt-0.5">Paddy, Wheat, Tomato, Potato, Cotton, Cane, Chilli, Groundnut</p>
            </div>
            <div>
              <div className="font-mono-tabular text-2xl font-bold text-emerald-300">8 Indian Languages</div>
              <p className="text-xs text-stone-300 mt-0.5">Native script UI + browser voice readout for field accessibility</p>
            </div>
            <div>
              <div className="font-mono-tabular text-2xl font-bold text-white">100% Offline Log</div>
              <p className="text-xs text-stone-300 mt-0.5">Zero API key required · Instant local scan history persistence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Multilingual Bar (Quick Switcher for 8 Regional Languages) */}
      <section className="border-y border-stone-200 py-6 hc-surface">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 hc-surface">
              01. Choose Your Preferred Farming Language (भाषा चुनें / மொழி)
            </h2>
            <p className="text-sm text-stone-600 hc-text-muted">
              Switch the entire interface and voice advisory readout with a single tap.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-emerald-900 text-white border-emerald-950 font-semibold hc-cta'
                      : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100 hc-surface'
                  }`}
                >
                  {lang.nativeName} · <span className="text-xs opacity-80">{lang.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Crop Selection Launchpad */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 hc-surface">
              02. Select a Crop to Start Instant Leaf Diagnosis
            </h2>
            <p className="text-sm sm:text-base text-stone-600 hc-text-muted mt-1">
              Tap your crop below to open the AI pathology scanner pre-configured for its seasonal diseases.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('scan')}
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 whitespace-nowrap self-start sm:self-auto"
          >
            Open Full Scanner & Camera →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CROPS_LIST.map((crop) => (
            <button
              key={crop.id}
              type="button"
              onClick={() => onQuickStartCropScan(crop.id)}
              className="group text-left p-5 rounded-xl bg-white border border-stone-200 hover:border-emerald-700 transition-colors flex flex-col justify-between gap-4 hc-surface cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-800"
            >
              <div className="space-y-1.5">
                <div className="text-xs text-stone-500 hc-text-muted">
                  <span>{crop.season}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{crop.waterNeed}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 hc-surface">
                  {crop.name}
                </h3>
                <p className="text-xs text-stone-600 hc-text-muted">
                  {crop.hindiName} · {crop.tamilName}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-950 hc-text-muted">
                <span>Scan {crop.name} Leaf</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How It Works — 3-Step Field Workflow */}
      <section className="bg-stone-100/80 border border-stone-200 rounded-2xl p-6 sm:p-10 space-y-8 hc-surface">
        <div className="max-w-2xl space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 hc-surface">
            03. Built for Indian Smallholder Field Conditions
          </h2>
          <p className="text-sm sm:text-base text-stone-600 hc-text-muted">
            Designed with high-contrast sunlight legibility, large 48px touch targets, and two-stage organic + chemical treatment protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="font-mono-tabular text-sm font-bold text-emerald-800">Step 01 / Capture</div>
            <h3 className="text-lg font-bold text-stone-900 hc-surface">Photograph Affected Leaf in Daylight</h3>
            <p className="text-sm text-stone-600 hc-text-muted leading-relaxed">
              Use your smartphone camera or upload an existing photo. No login or subscription needed. You can also test immediately using built-in field pathology samples.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-mono-tabular text-sm font-bold text-emerald-800">Step 02 / Diagnose</div>
            <h3 className="text-lg font-bold text-stone-900 hc-surface">Inspect Lesions, Confidence & Severity</h3>
            <p className="text-sm text-stone-600 hc-text-muted leading-relaxed">
              Receive a clear breakdown of clinical symptoms, confidence percentage, affected leaf surface ratio, and estimated yield impact if left untreated.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-mono-tabular text-sm font-bold text-emerald-800">Step 03 / Act & Verify</div>
            <h3 className="text-lg font-bold text-stone-900 hc-surface">Organic First, Chemical Second, KVK Support</h3>
            <p className="text-sm text-stone-600 hc-text-muted leading-relaxed">
              Prioritize low-cost bio-fungicides (Trichoderma, Pseudomonas, Neem) before chemical sprays, or forward your report directly to a regional KVK scientist.
            </p>
          </div>
        </div>
      </section>

      {/* Attributable Farmer Testimonial & Kisan Call Centre Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between space-y-4 hc-surface">
          <p className="text-base sm:text-lg text-stone-800 italic leading-relaxed hc-surface">
            “Before using KisanPulse during the Samba paddy season, we mistook early Rice Leaf Blast for nitrogen deficiency and applied extra Urea, which worsened the fungal spread. Scanning the spindle lesions gave us an immediate Tamil voice warning to pause Urea and spray Pseudomonas, saving 32 quintals across our 2-acre plot.”
          </p>
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 hc-text-muted">
            <div>
              <strong className="text-stone-900 font-semibold hc-surface">Thiru M. Shanmugam</strong> · Smallholder Paddy & Blackgram Grower · Papanasam Taluk, Thanjavur District
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified KVK Field Trial
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-emerald-950 text-white flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-emerald-300 font-medium">Government of India · Ministry of Agriculture Advisory</p>
            <h3 className="font-display text-xl font-bold">Need Live Telephone Guidance?</h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              Connect with state agricultural university specialists via the toll-free Kisan Call Centre or send your scan log to your district Krishi Vigyan Kendra.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="tel:18001801551"
              className="min-h-[44px] px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg inline-flex items-center gap-2 whitespace-nowrap hc-cta"
            >
              <PhoneCall className="w-4 h-4 shrink-0" />
              <span>Call 1800-180-1551</span>
            </a>
            <button
              type="button"
              onClick={() => setActiveTab('expert')}
              className="min-h-[44px] px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 transition-colors whitespace-nowrap cursor-pointer"
            >
              Browse KVK Directory →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
