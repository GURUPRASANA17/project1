import React from 'react';
import { Volume2, PhoneCall, ArrowLeft, AlertTriangle, CheckCircle2, ShieldAlert, Printer } from 'lucide-react';
import { LanguageCode, NavTab, ScanRecord } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';

interface DiseaseResultProps {
  record: ScanRecord;
  language: LanguageCode;
  onBackToScanner: () => void;
  onNavigateTab: (tab: NavTab) => void;
  onSpeakText: (text: string) => void;
}

export const DiseaseResult: React.FC<DiseaseResultProps> = ({
  record,
  language,
  onBackToScanner,
  onNavigateTab,
  onSpeakText,
}) => {
  const t = TRANSLATIONS[language];
  const { prediction } = record;
  const localizedDiseaseName = prediction.localNames[language] || prediction.diseaseName;

  const handleReadFullReport = () => {
    const script = `${localizedDiseaseName}. ${t.confidenceScore}: ${prediction.confidence} percent. ${t.severityLevel}: ${prediction.severity}. ${t.symptomsHeader}: ${prediction.symptoms.join(' ')} ${t.actionsHeader}: ${prediction.recommendedActions.join(' ')} Organic Remedies: ${prediction.organicRemedies.join(' ')}`;
    onSpeakText(script);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-14">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <button
          type="button"
          onClick={onBackToScanner}
          className="min-h-[44px] px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer hc-surface"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Scan Another Leaf</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleReadFullReport}
            className="min-h-[44px] px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg flex items-center gap-2 transition-colors cursor-pointer hc-cta"
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>{t.voiceReadPage} (Audio Report)</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-[44px] px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer hc-surface"
          >
            <Printer className="w-4 h-4 shrink-0" />
            <span>Print Clinical Sheet</span>
          </button>
        </div>
      </div>

      {/* Diagnostic Summary Header Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 hc-surface">
        {/* Specimen Image */}
        <div className="lg:col-span-5 space-y-3">
          <div className="aspect-4/3 rounded-xl overflow-hidden border border-stone-200 bg-stone-900">
            <img
              src={record.imageUrl}
              alt={`${record.cropName} specimen diagnosed with ${prediction.diseaseName}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono-tabular hc-text-muted">
            <span>ID: {record.id}</span>
            <span>{record.timestamp}</span>
          </div>
        </div>

        {/* Core Pathology Metrics */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            {/* Unboxed metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 hc-text-muted">
              <span className="font-semibold text-stone-800 hc-surface">{record.cropName}</span>
              <span aria-hidden="true">·</span>
              <span className="italic">{prediction.scientificName}</span>
              <span aria-hidden="true">·</span>
              <span>{record.fieldPlot}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900 hc-surface">
              {prediction.diseaseName}
            </h1>

            {prediction.localNames[language] && (
              <p className="text-base sm:text-lg font-semibold text-emerald-900 hc-text-muted">
                Regional Name: {prediction.localNames[language]}
              </p>
            )}
          </div>

          {/* 3-Column Tabular Telemetry Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
            <div>
              <div className="text-xs text-stone-500 hc-text-muted">{t.confidenceScore}</div>
              <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-emerald-800 mt-0.5">
                {prediction.confidence}%
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-emerald-700"
                  style={{ width: `${Math.min(100, prediction.confidence)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500 hc-text-muted">{t.severityLevel}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {prediction.severity === 'Healthy' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                ) : (
                  <AlertTriangle
                    className={`w-6 h-6 shrink-0 ${
                      prediction.severity === 'High' ? 'text-red-700' : 'text-amber-600'
                    }`}
                  />
                )}
                <span
                  className={`font-mono-tabular text-2xl sm:text-3xl font-bold ${
                    prediction.severity === 'High'
                      ? 'text-red-700'
                      : prediction.severity === 'Moderate'
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {prediction.severity}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono-tabular mt-1 hc-text-muted">
                Affected Leaf Area: {prediction.affectedAreaPercent}%
              </p>
            </div>

            <div>
              <div className="text-xs text-stone-500 hc-text-muted">Potential Yield Risk</div>
              <div className="font-mono-tabular text-sm font-bold text-stone-900 mt-1 leading-snug hc-surface">
                {prediction.estimatedYieldImpact}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-100 text-xs text-stone-700 leading-relaxed hc-surface">
            <strong className="font-semibold text-stone-900 hc-surface">Epidemiological Spread Risk: </strong>
            {prediction.spreadRisk}
          </div>
        </div>
      </section>

      {/* Clinical Breakdown Grid: Symptoms + Immediate Field Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Symptoms */}
        <section className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 hc-surface">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 hc-surface">
            01. {t.symptomsHeader}
          </h2>
          <ul className="space-y-3 text-sm text-stone-700 hc-text-muted">
            {prediction.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-mono-tabular font-bold text-emerald-800 text-xs mt-0.5">
                  0{idx + 1}.
                </span>
                <span className="leading-relaxed">{symptom}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Immediate Cultural / Field Management Actions */}
        <section className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 hc-surface">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 hc-surface">
            02. {t.actionsHeader}
          </h2>
          <ul className="space-y-3 text-sm text-stone-700 hc-text-muted">
            {prediction.recommendedActions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-mono-tabular font-bold text-amber-700 text-xs mt-0.5">
                  0{idx + 1}.
                </span>
                <span className="leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Two-Stage Integrated Disease Management (IDM): Organic First + Chemical Second */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="p-6 rounded-2xl bg-emerald-950 text-white space-y-4">
          <div className="border-b border-white/15 pb-3">
            <p className="text-xs text-emerald-300 font-medium">Stage A · Bio-Control & Organic First</p>
            <h2 className="text-lg font-bold">Eco-Friendly Biological & Botanical Remedies</h2>
          </div>
          <ul className="space-y-3 text-sm text-stone-200">
            {prediction.organicRemedies.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 hc-surface">
          <div className="border-b border-stone-100 pb-3">
            <p className="text-xs text-amber-800 font-medium">Stage B · Targeted Chemical Control (If Above ETL)</p>
            <h2 className="text-lg font-bold text-stone-900 hc-surface">
              ICAR-Standard Fungicide / Bactericide Dosage
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-stone-700 hc-text-muted">
            {prediction.chemicalControl.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Prevention & Bio-Security */}
      <section className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 hc-surface">
        <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 hc-surface">
          03. {t.preventionHeader}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-stone-700 hc-text-muted">
          {prediction.preventionTips.map((tip, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-mono-tabular text-xs font-bold text-emerald-800">
                Measure 0{idx + 1}
              </div>
              <p className="leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Escalation & Mandatory Agricultural Disclaimer */}
      <section className="p-6 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-4 hc-surface">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900 hc-surface">
                Regulatory & Agronomic Safety Disclaimer
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed hc-text-muted">
                {t.disclaimerText}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('expert')}
            className="min-h-[48px] px-5 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-sm rounded-xl flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer hc-cta"
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span>{t.askExpertBtn}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
