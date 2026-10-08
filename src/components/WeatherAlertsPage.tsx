import React, { useState } from 'react';
import { CloudRain, AlertTriangle, CheckCircle2, Volume2, Thermometer, Droplets, Wind } from 'lucide-react';
import { LanguageCode } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { WEATHER_ALERTS } from '../data/agriDatabase';

interface WeatherAlertsPageProps {
  language: LanguageCode;
  onSpeakText: (text: string) => void;
}

export const WeatherAlertsPage: React.FC<WeatherAlertsPageProps> = ({
  language,
  onSpeakText,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'High' | 'Moderate' | 'Advisory'>('all');

  const filteredAlerts = WEATHER_ALERTS.filter(
    (a) => selectedSeverity === 'all' || a.severity === selectedSeverity
  );

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div className="space-y-1">
          <p className="text-xs font-medium text-stone-500 hc-text-muted">
            IMD Agromet & Spore Epidemiology Forecast · 5-Day Spray Window Planner
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 hc-surface">
            {t.weatherTitle}
          </h1>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start hc-surface">
          {(['all', 'High', 'Moderate', 'Advisory'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSelectedSeverity(level)}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedSeverity === level
                  ? 'bg-emerald-900 text-white hc-cta'
                  : 'text-stone-700 hover:text-stone-950 hc-text-muted'
              }`}
            >
              {level === 'all' ? 'All Zones' : `${level} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Day Spray Suitability Matrix */}
      <section className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 hc-surface">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-stone-900 hc-surface">
              5-Day Foliar Spray & Irrigation Suitability Forecast
            </h2>
            <p className="text-xs text-stone-500 hc-text-muted">
              Fungicide sprays require at least 4 rain-free hours and wind speed under 15 km/h for leaf adhesion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {[
            { day: 'Today (Thu)', temp: '29°C / 24°C', rh: '91% RH', status: 'Caution · Evening Only', safe: false },
            { day: 'Fri · Oct 09', temp: '28°C / 23°C', rh: '88% RH', status: 'Avoid · Afternoon Rain', safe: false },
            { day: 'Sat · Oct 10', temp: '30°C / 22°C', rh: '74% RH', status: 'Safe Spray Window', safe: true },
            { day: 'Sun · Oct 11', temp: '31°C / 21°C', rh: '68% RH', status: 'Optimal Dry Breeze', safe: true },
            { day: 'Mon · Oct 12', temp: '31°C / 20°C', rh: '64% RH', status: 'Optimal Dry Breeze', safe: true },
          ].map((slot, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2 hc-surface"
            >
              <div className="text-xs font-bold text-stone-900 hc-surface">{slot.day}</div>
              <div className="font-mono-tabular text-base font-bold text-emerald-900 hc-text-muted">
                {slot.temp}
              </div>
              <div className="text-xs text-stone-500 font-mono-tabular hc-text-muted">{slot.rh}</div>
              <div
                className={`pt-2 border-t border-stone-200 text-xs font-semibold flex items-center gap-1.5 ${
                  slot.safe ? 'text-emerald-800' : 'text-amber-800'
                }`}
              >
                {slot.safe ? (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  < CloudRain className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{slot.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Epidemiological Bulletins */}
      <div className="space-y-6">
        {filteredAlerts.map((alert) => (
          <article
            key={alert.id}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 space-y-5 hc-surface"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 ${
                      alert.severity === 'High'
                        ? 'text-red-700'
                        : alert.severity === 'Moderate'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }`}
                  />
                  <span className="font-bold text-stone-900 hc-surface">
                    {alert.severity} Outbreak Alert
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-600 hc-text-muted">
                    {alert.district}, {alert.state}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular text-stone-500 hc-text-muted">
                    Valid until {alert.validUntil}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-stone-900 hc-surface">{alert.title}</h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSpeakText(`${alert.district}. ${alert.title}. ${alert.description} ${alert.actionRequired}`)
                }
                className="min-h-[44px] px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start shrink-0 cursor-pointer hc-surface"
              >
                <Volume2 className="w-4 h-4 text-emerald-800" />
                <span>Listen to Bulletin</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-stone-500 hc-text-muted">
                  Meteorological & Spore Condition
                </h3>
                <p className="text-stone-700 leading-relaxed hc-surface">{alert.description}</p>
                <p className="text-stone-600 text-xs pt-1 hc-text-muted">
                  <strong>Susceptible Crops:</strong> {alert.cropImpact}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 hc-surface">
                <h3 className="text-xs font-bold text-emerald-950 hc-surface">
                  Mandatory Smallholder Field Advisory
                </h3>
                <p className="text-stone-800 text-sm leading-relaxed hc-text-muted">
                  {alert.actionRequired}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-mono-tabular hc-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5" /> Soil Temp: 25.5°C
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5" /> Leaf Wetness: 7.2 hrs
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" /> Canopy Wind: 9–14 km/h
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
