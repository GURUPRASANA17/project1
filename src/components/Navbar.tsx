import React from 'react';
import { Camera, Volume2, VolumeX, Sun, Type, Globe, Wifi, WifiOff } from 'lucide-react';
import { LanguageCode, NavTab } from '../types/agri';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isSpeaking: boolean;
  onToggleSpeakPage: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  largeText: boolean;
  setLargeText: (val: boolean) => void;
  isOffline: boolean;
  onToggleOfflineSimulation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isSpeaking,
  onToggleSpeakPage,
  highContrast,
  setHighContrast,
  largeText,
  setLargeText,
  isOffline,
  onToggleOfflineSimulation,
}) => {
  const t = TRANSLATIONS[language];

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'dashboard', label: t.navDashboard },
    { id: 'scan', label: t.navScan },
    { id: 'history', label: t.navHistory },
    { id: 'weather', label: t.navWeather },
    { id: 'expert', label: t.navExpert },
  ];

  return (
    <>
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-stone-200 hc-surface px-4 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="font-display text-xl font-bold tracking-tight text-emerald-950 hover:text-emerald-800 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-700"
        >
          {t.brandName}
        </button>

        {/* Zone 2: Clean text navigation links with subtle hover underlines */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navItems.map((item, idx) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`py-2 whitespace-nowrap transition-colors border-b-2 ${
                  idx >= 5 ? 'hidden xl:inline-block' : ''
                } ${
                  isActive
                    ? 'border-emerald-800 text-emerald-950 font-semibold'
                    : 'border-transparent hover:border-stone-400 hover:text-stone-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions (Network Indicator + Language selector + Voice/Contrast + Primary CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Network Status & Offline-Resilient Mode Indicator */}
          <button
            type="button"
            onClick={onToggleOfflineSimulation}
            title={
              isOffline
                ? `${t.networkOffline}: ${t.offlineToastTitle} (Click to switch to Online)`
                : `${t.networkOnline} (Click to test Offline-Resilient Field Mode)`
            }
            aria-label={isOffline ? t.networkOffline : t.networkOnline}
            aria-pressed={isOffline}
            className={`min-h-[44px] px-2.5 sm:px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isOffline
                ? 'bg-amber-100 text-amber-950 border-amber-500 font-bold hc-cta'
                : 'bg-stone-100 text-emerald-900 border-stone-300 hover:bg-stone-200 hc-surface'
            }`}
          >
            {isOffline ? (
              <WifiOff className="w-4 h-4 text-amber-800 shrink-0" aria-hidden="true" />
            ) : (
              <Wifi className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
            )}
            <span className="hidden xl:inline">
              {isOffline ? t.networkOffline : t.networkOnline}
            </span>
          </button>

          {/* Multilingual Selector (8 Indian Languages) */}
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-stone-600 absolute left-2.5 pointer-events-none" aria-hidden="true" />
            <select
              aria-label="Select Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="min-h-[44px] pl-8 pr-3 py-1.5 text-xs sm:text-sm font-medium bg-stone-100 hover:bg-stone-200/80 text-stone-900 rounded-lg border border-stone-300 focus-visible:outline-2 focus-visible:outline-emerald-800 cursor-pointer hc-surface"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Voice Read-Aloud Toggle */}
          <button
            type="button"
            onClick={onToggleSpeakPage}
            title={isSpeaking ? t.voiceStop : t.voiceReadPage}
            aria-label={isSpeaking ? t.voiceStop : t.voiceReadPage}
            className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              isSpeaking
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200 hc-surface'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 shrink-0" /> : <Volume2 className="w-4 h-4 shrink-0" />}
            <span className="hidden md:inline">{isSpeaking ? t.voiceStop : t.voiceReadPage}</span>
          </button>

          {/* Sunlight High-Contrast Toggle */}
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            title={t.highContrastLabel}
            aria-label={t.highContrastLabel}
            aria-pressed={highContrast}
            className={`min-h-[44px] min-w-[44px] p-2.5 rounded-lg border transition-colors flex items-center justify-center shrink-0 ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-500 font-bold'
                : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Large Typography Toggle */}
          <button
            type="button"
            onClick={() => setLargeText(!largeText)}
            title={t.largeTextLabel}
            aria-label={t.largeTextLabel}
            aria-pressed={largeText}
            className={`hidden sm:flex min-h-[44px] min-w-[44px] p-2.5 rounded-lg border transition-colors items-center justify-center shrink-0 ${
              largeText
                ? 'bg-emerald-900 text-white border-emerald-950 font-bold'
                : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200 hc-surface'
            }`}
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => setActiveTab('scan')}
            className="hidden sm:inline-flex min-h-[44px] px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg items-center gap-2 transition-colors whitespace-nowrap shrink-0 hc-cta shadow-xs"
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>{t.ctaCheckCrop}</span>
          </button>
        </div>
      </header>
    </>
  );
};
