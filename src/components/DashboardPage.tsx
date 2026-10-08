import React, { useState } from 'react';
import { Camera, AlertTriangle, CheckSquare, Square, Plus, Volume2, ArrowUpRight, Thermometer, Droplets, Wind } from 'lucide-react';
import { FarmingTask, LanguageCode, NavTab, ScanRecord } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { WEATHER_ALERTS } from '../data/agriDatabase';

interface DashboardPageProps {
  language: LanguageCode;
  setActiveTab: (tab: NavTab) => void;
  scanHistory: ScanRecord[];
  tasks: FarmingTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, crop: string, priority: 'Urgent' | 'Routine' | 'Preventive') => void;
  onSelectScanRecord: (record: ScanRecord) => void;
  onSpeakText: (text: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  language,
  setActiveTab,
  scanHistory,
  tasks,
  onToggleTask,
  onAddTask,
  onSelectScanRecord,
  onSpeakText,
}) => {
  const t = TRANSLATIONS[language];
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCrop, setNewTaskCrop] = useState('Paddy (Plot A1)');
  const [newTaskPriority, setNewTaskPriority] = useState<'Urgent' | 'Routine' | 'Preventive'>('Routine');
  const [selectedDistrictIdx, setSelectedDistrictIdx] = useState(0);

  const activeWeather = WEATHER_ALERTS[selectedDistrictIdx] || WEATHER_ALERTS[0];
  const completedCount = tasks.filter((task) => task.completed).length;
  const highRiskScans = scanHistory.filter((s) => s.prediction.severity === 'High').length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim(), newTaskCrop, newTaskPriority);
    setNewTaskTitle('');
  };

  const readDashboardSummary = () => {
    const summary = `${t.dashboardTitle}. You have ${scanHistory.length} recorded crop scans, with ${highRiskScans} high severity alerts. Current weather alert for ${activeWeather.district}: ${activeWeather.title}. ${activeWeather.actionRequired}`;
    onSpeakText(summary);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div className="space-y-1">
          <p className="text-xs font-medium text-stone-500 hc-text-muted">
            Rabi & Samba Field Telemetry · Updated Oct 2026
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 hc-surface">
            {t.dashboardTitle}
          </h1>
          <p className="text-sm text-stone-600 hc-text-muted">{t.dashboardSubtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={readDashboardSummary}
            className="min-h-[44px] px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap hc-surface cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>{t.voiceReadPage}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scan')}
            className="min-h-[44px] px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap hc-cta cursor-pointer"
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>+ {t.ctaCheckCrop}</span>
          </button>
        </div>
      </div>

      {/* Top Row: 4 Structured Telemetry Cards (Single-level elevation, tabular numerals) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-2 hc-surface">
          <div className="text-xs text-stone-500 hc-text-muted">Overall Crop Vitality Index</div>
          <div className="font-mono-tabular text-3xl font-bold text-emerald-800">84.2%</div>
          <p className="text-xs text-stone-600 hc-text-muted">
            2 plots healthy · 1 plot requires blast fungicide before panicle stage
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-2 hc-surface">
          <div className="text-xs text-stone-500 hc-text-muted">Active Pathogen Alerts</div>
          <div className="font-mono-tabular text-3xl font-bold text-red-700">
            {highRiskScans} High Risk
          </div>
          <p className="text-xs text-stone-600 hc-text-muted">
            Total scans logged: <span className="font-mono-tabular font-semibold">{scanHistory.length}</span> in local storage
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-2 hc-surface">
          <div className="text-xs text-stone-500 hc-text-muted">Canopy Micro-Climate</div>
          <div className="font-mono-tabular text-3xl font-bold text-amber-700">28.4°C · 86% RH</div>
          <p className="text-xs text-stone-600 hc-text-muted">
            Leaf wetness duration: <span className="font-mono-tabular">6.5 hrs/night</span> (Spore alert)
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-2 hc-surface">
          <div className="text-xs text-stone-500 hc-text-muted">Field Tasks Completed</div>
          <div className="font-mono-tabular text-3xl font-bold text-stone-900 hc-surface">
            {completedCount} / {tasks.length}
          </div>
          <p className="text-xs text-stone-600 hc-text-muted">
            Next urgent action due before <span className="font-mono-tabular">11:00 AM</span> today
          </p>
        </div>
      </div>

      {/* Main Two-Column Workspace: Weather Risk Advisory + Farming Task Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Weather Risk & Recent Plot Health */}
        <div className="lg:col-span-7 space-y-8">
          {/* Interactive Regional Weather & Spore Risk Panel */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-5 hc-surface">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900 hc-surface">
                  Micro-Climate & Fungal Spore Outbreak Radar
                </h2>
                <p className="text-xs text-stone-500 hc-text-muted">
                  Select agro-climatic zone to inspect localized humidity and spray windows
                </p>
              </div>

              {/* Interactive Segmented Control */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 hc-surface">
                {WEATHER_ALERTS.map((alert, idx) => (
                  <button
                    key={alert.id}
                    type="button"
                    onClick={() => setSelectedDistrictIdx(idx)}
                    className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedDistrictIdx === idx
                        ? 'bg-emerald-900 text-white shadow-2xs hc-cta'
                        : 'text-stone-700 hover:text-stone-950 hc-text-muted'
                    }`}
                  >
                    {alert.state.split('/')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <AlertTriangle
                  className={`w-4 h-4 shrink-0 ${
                    activeWeather.severity === 'High'
                      ? 'text-red-700'
                      : activeWeather.severity === 'Moderate'
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}
                />
                <span
                  className={
                    activeWeather.severity === 'High'
                      ? 'text-red-800'
                      : activeWeather.severity === 'Moderate'
                      ? 'text-amber-800'
                      : 'text-emerald-800'
                  }
                >
                  {activeWeather.severity} Risk Alert · {activeWeather.district}
                </span>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span className="text-stone-500 font-mono-tabular">Valid until {activeWeather.validUntil}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 hc-surface">
                {activeWeather.title}
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed hc-text-muted">
                {activeWeather.description}
              </p>

              <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <div className="text-stone-500">Day / Night Temp</div>
                    <div className="font-mono-tabular font-semibold text-stone-900 hc-surface">29°C / 23°C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <div className="text-stone-500">Canopy Humidity</div>
                    <div className="font-mono-tabular font-semibold text-stone-900 hc-surface">89% RH</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-stone-600 shrink-0" />
                  <div>
                    <div className="text-stone-500">Wind Drift Speed</div>
                    <div className="font-mono-tabular font-semibold text-stone-900 hc-surface">11 km/h NE</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs sm:text-sm text-emerald-950 bg-emerald-50/70 p-3.5 rounded-lg hc-surface">
                <strong className="font-semibold">Recommended Field Action: </strong>
                {activeWeather.actionRequired}
              </div>
            </div>
          </div>

          {/* Recent Plot Scans Table */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 hc-surface">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-stone-900 hc-surface">
                  Recent Plot Diagnostic Scans
                </h2>
                <p className="text-xs text-stone-500 hc-text-muted">
                  Click any scan row to inspect full symptoms and treatment sheet
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className="text-xs font-semibold text-emerald-800 hover:underline whitespace-nowrap cursor-pointer"
              >
                View Full History ({scanHistory.length}) →
              </button>
            </div>

            <div className="divide-y divide-stone-200">
              {scanHistory.slice(0, 4).map((record) => (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => onSelectScanRecord(record)}
                  className="w-full py-3.5 px-2 hover:bg-stone-50 transition-colors flex items-center justify-between gap-4 text-left cursor-pointer group hc-surface"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2 text-xs text-stone-500 hc-text-muted">
                      <span className="font-mono-tabular">{record.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>{record.cropName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{record.timestamp}</span>
                    </div>
                    <div className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 truncate hc-surface">
                      {record.prediction.diseaseName}
                    </div>
                    <div className="text-xs text-stone-600 truncate hc-text-muted">
                      {record.fieldPlot}
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex items-center gap-3">
                    <div>
                      <div
                        className={`text-xs font-bold ${
                          record.prediction.severity === 'High'
                            ? 'text-red-700'
                            : record.prediction.severity === 'Moderate'
                            ? 'text-amber-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        {record.prediction.severity} Severity
                      </div>
                      <div className="text-xs text-stone-500 font-mono-tabular hc-text-muted">
                        {record.prediction.confidence}% conf
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Agronomic Task Planner */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-5 hc-surface">
            <div>
              <h2 className="text-lg font-bold text-stone-900 hc-surface">
                Agronomic Field Task Checklist
              </h2>
              <p className="text-xs text-stone-500 hc-text-muted">
                Tap any task to mark completed. Add custom spray or irrigation reminders below.
              </p>
            </div>

            {/* Add New Task Form */}
            <form onSubmit={handleCreateTask} className="space-y-3 pt-1 border-b border-stone-200 pb-5">
              <label htmlFor="new-task-input" className="block text-xs font-semibold text-stone-700 hc-text-muted">
                Add New Field Operation
              </label>
              <input
                id="new-task-input"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g., Spray Neem Oil 3% on Plot C4 Tomato..."
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus-visible:outline-2 focus-visible:outline-emerald-800 hc-surface"
              />
              <div className="flex items-center gap-2">
                <select
                  aria-label="Select Crop Plot"
                  value={newTaskCrop}
                  onChange={(e) => setNewTaskCrop(e.target.value)}
                  className="min-h-[44px] px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-300 rounded-lg flex-1 hc-surface"
                >
                  <option value="Paddy (Plot A1)">Paddy (Plot A1)</option>
                  <option value="Wheat (Plot B2)">Wheat (Plot B2)</option>
                  <option value="Tomato (Plot C4)">Tomato (Plot C4)</option>
                  <option value="Cotton (Plot D1)">Cotton (Plot D1)</option>
                </select>

                <select
                  aria-label="Select Task Priority"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as 'Urgent' | 'Routine' | 'Preventive')}
                  className="min-h-[44px] px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-300 rounded-lg hc-surface"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="Preventive">Preventive</option>
                  <option value="Routine">Routine</option>
                </select>

                <button
                  type="submit"
                  className="min-h-[44px] px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0 hc-cta cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </form>

            {/* Task List */}
            <div className="divide-y divide-stone-200">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => onToggleTask(task.id)}
                  className="w-full py-3.5 flex items-start gap-3.5 text-left hover:bg-stone-50/80 transition-colors cursor-pointer hc-surface"
                >
                  <div className="mt-0.5 text-emerald-800 shrink-0">
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-400" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500 hc-text-muted">
                      <span
                        className={`font-semibold ${
                          task.priority === 'Urgent'
                            ? 'text-red-700'
                            : task.priority === 'Preventive'
                            ? 'text-amber-700'
                            : 'text-stone-700'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{task.crop}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{task.dueTime}</span>
                    </div>
                    <p
                      className={`text-sm font-medium leading-snug ${
                        task.completed ? 'line-through text-stone-400' : 'text-stone-900 hc-surface'
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
