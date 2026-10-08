import React from 'react';
import { WifiOff, Wifi, X, CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';

interface OfflineToastProps {
  visible: boolean;
  isOffline: boolean;
  language: LanguageCode;
  onDismiss: () => void;
}

export const OfflineToast: React.FC<OfflineToastProps> = ({
  visible,
  isOffline,
  language,
  onDismiss,
}) => {
  if (!visible) return null;

  const t = TRANSLATIONS[language];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 left-4 sm:left-auto sm:max-w-md z-50 transition-all duration-200"
    >
      <div
        className={`p-4 rounded-2xl border shadow-xl flex items-start gap-3.5 hc-surface ${
          isOffline
            ? 'bg-stone-950 text-white border-amber-500/80'
            : 'bg-emerald-950 text-white border-emerald-400/70'
        }`}
      >
        <div
          className={`p-2 rounded-xl shrink-0 mt-0.5 ${
            isOffline ? 'bg-amber-500 text-stone-950' : 'bg-emerald-500 text-stone-950'
          }`}
        >
          {isOffline ? (
            <WifiOff className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Wifi className="w-5 h-5" aria-hidden="true" />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tabular uppercase tracking-wider text-amber-400 font-semibold">
              {isOffline ? t.networkOffline : t.networkOnline}
            </span>
            {!isOffline && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
          </div>

          <h3 className="text-sm font-bold leading-snug text-white">
            {isOffline ? t.offlineToastTitle : t.onlineToastTitle}
          </h3>

          <p className="text-xs text-stone-300 leading-relaxed">
            {isOffline ? t.offlineToastDesc : t.onlineToastDesc}
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="min-h-[36px] min-w-[36px] -mr-1 -mt-1 rounded-lg flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
