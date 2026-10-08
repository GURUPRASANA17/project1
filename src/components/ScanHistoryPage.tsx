import React, { useState } from 'react';
import { Trash2, Search, Camera, ArrowUpRight, Download } from 'lucide-react';
import { CropId, LanguageCode, NavTab, ScanRecord } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { CROPS_LIST } from '../data/agriDatabase';

interface ScanHistoryPageProps {
  language: LanguageCode;
  scanHistory: ScanRecord[];
  onSelectRecord: (record: ScanRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAllHistory: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const ScanHistoryPage: React.FC<ScanHistoryPageProps> = ({
  language,
  scanHistory,
  onSelectRecord,
  onDeleteRecord,
  onClearAllHistory,
  onNavigateTab,
}) => {
  const t = TRANSLATIONS[language];
  const [filterCrop, setFilterCrop] = useState<'all' | CropId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const filteredRecords = scanHistory.filter((item) => {
    const matchesCrop = filterCrop === 'all' || item.cropId === filterCrop;
    const matchesQuery =
      !searchQuery.trim() ||
      item.prediction.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fieldPlot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesQuery;
  });

  const handleExportCsv = () => {
    const headers = ['Scan ID', 'Timestamp', 'Crop', 'Field Plot', 'Disease', 'Confidence %', 'Severity'];
    const rows = scanHistory.map((r) => [
      r.id,
      r.timestamp,
      `"${r.cropName}"`,
      `"${r.fieldPlot}"`,
      `"${r.prediction.diseaseName}"`,
      r.prediction.confidence,
      r.prediction.severity,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'kisanpulse_field_scans.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div className="space-y-1">
          <p className="text-xs font-medium text-stone-500 hc-text-muted">
            Persistent Browser LocalStorage Ledger · {scanHistory.length} Total Entries
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 hc-surface">
            {t.historyTitle}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {scanHistory.length > 0 && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="min-h-[44px] px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer hc-surface"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Export CSV</span>
            </button>
          )}

          {scanHistory.length > 0 && (
            confirmClear ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClearAllHistory();
                    setConfirmClear(false);
                  }}
                  className="min-h-[44px] px-3 py-2 bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Confirm Delete All
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="min-h-[44px] px-3 py-2 bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="min-h-[44px] px-3.5 py-2 bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-800 border border-stone-300 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer hc-surface"
              >
                <Trash2 className="w-4 h-4 shrink-0" />
                <span>Reset Log</span>
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onNavigateTab('scan')}
            className="min-h-[44px] px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer hc-cta"
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>+ New Scan</span>
          </button>
        </div>
      </div>

      {/* Search & Crop Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by disease name, plot, or scan ID..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-xl focus-visible:outline-2 focus-visible:outline-emerald-800 hc-surface"
          />
        </div>

        {/* Interactive Crop Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setFilterCrop('all')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterCrop === 'all'
                ? 'bg-emerald-900 text-white hc-cta'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hc-surface'
            }`}
          >
            All Crops ({scanHistory.length})
          </button>
          {CROPS_LIST.slice(0, 5).map((crop) => (
            <button
              key={crop.id}
              type="button"
              onClick={() => setFilterCrop(crop.id)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCrop === crop.id
                  ? 'bg-emerald-900 text-white hc-cta'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hc-surface'
              }`}
            >
              {crop.name}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State or Populated List */}
      {filteredRecords.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-stone-200 text-center space-y-4 hc-surface">
          <h2 className="text-lg font-bold text-stone-900 hc-surface">No Diagnostic Records Found</h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto hc-text-muted">
            Your field diagnostic history is currently empty or no scans matched your filter criteria. Capture a leaf photo to log your first plot inspection.
          </p>
          <button
            type="button"
            onClick={() => onNavigateTab('scan')}
            className="min-h-[48px] px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl inline-flex items-center gap-2 cursor-pointer hc-cta"
          >
            <Camera className="w-4 h-4" />
            <span>Scan First Crop Leaf</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="rounded-2xl bg-white border border-stone-200 overflow-hidden flex flex-col justify-between hc-surface"
            >
              <div>
                <div className="aspect-16/9 w-full bg-stone-900 overflow-hidden border-b border-stone-100">
                  <img
                    src={record.imageUrl}
                    alt={record.prediction.diseaseName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  {/* Unboxed metadata with middle dots */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono-tabular hc-text-muted">
                    <span>{record.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{record.cropName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{record.timestamp}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 leading-snug hc-surface">
                    {record.prediction.diseaseName}
                  </h3>

                  <p className="text-xs text-stone-600 hc-text-muted">{record.fieldPlot}</p>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono-tabular">
                    <span
                      className={`font-bold ${
                        record.prediction.severity === 'High'
                          ? 'text-red-700'
                          : record.prediction.severity === 'Moderate'
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      Severity: {record.prediction.severity}
                    </span>
                    <span className="text-stone-700 font-semibold hc-surface">
                      Confidence: {record.prediction.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between hc-surface">
                <button
                  type="button"
                  onClick={() => onSelectRecord(record)}
                  className="min-h-[40px] text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer hc-text-muted"
                >
                  <span>Open Full Clinical Sheet</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteRecord(record.id)}
                  aria-label={`Delete scan ${record.id}`}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
