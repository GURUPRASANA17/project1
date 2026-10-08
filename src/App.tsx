import { useState, useEffect } from 'react';
import { CropId, FarmingTask, LanguageCode, NavTab, ScanRecord } from './types/agri';
import { INITIAL_FARMING_TASKS, INITIAL_SCAN_HISTORY } from './data/agriDatabase';
import { TRANSLATIONS } from './data/translations';
import { speakText, stopSpeaking } from './utils/speech';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { DiseaseScanner } from './components/DiseaseScanner';
import { DiseaseResult } from './components/DiseaseResult';
import { ScanHistoryPage } from './components/ScanHistoryPage';
import { WeatherAlertsPage } from './components/WeatherAlertsPage';
import { ExpertHelpPage } from './components/ExpertHelpPage';
import { OfflineToast } from './components/OfflineToast';

const STORAGE_KEY_SCANS = 'kisanpulse_scan_history_v1';
const STORAGE_KEY_TASKS = 'kisanpulse_farming_tasks_v1';
const STORAGE_KEY_LANG = 'kisanpulse_language_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCrop, setSelectedCrop] = useState<CropId>('rice');
  const [activeResultRecord, setActiveResultRecord] = useState<ScanRecord | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);

  // Network & Offline-Resilient Mode State
  const [browserOffline, setBrowserOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  const isOffline = browserOffline || simulatedOffline;

  useEffect(() => {
    const handleOffline = () => {
      setBrowserOffline(true);
      setToastVisible(true);
    };
    const handleOnline = () => {
      setBrowserOffline(false);
      setSimulatedOffline(false);
      setToastVisible(true);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Auto-dismiss online restoration toast after 5 seconds; keep offline toast visible until dismissed or 8 seconds
  useEffect(() => {
    if (!toastVisible) return;
    const timeoutMs = isOffline ? 8000 : 4500;
    const timer = window.setTimeout(() => {
      setToastVisible(false);
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [toastVisible, isOffline]);

  const handleToggleOfflineSimulation = () => {
    if (browserOffline) {
      // If genuinely disconnected, re-show the offline toast explaining resilience
      setToastVisible(true);
      return;
    }
    setSimulatedOffline((prev) => {
      const nextState = !prev;
      setToastVisible(true);
      return nextState;
    });
  };

  // Language persistence
  const [language, setLanguage] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG) as LanguageCode | null;
      return saved || 'en';
    } catch {
      return 'en';
    }
  });

  // Scan History persistence via localStorage
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SCANS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial seed data
    }
    return INITIAL_SCAN_HISTORY;
  });

  // Farming Tasks persistence via localStorage
  const [tasks, setTasks] = useState<FarmingTask[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TASKS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_FARMING_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCANS, JSON.stringify(scanHistory));
    } catch {
      // Ignore quota errors
    }
  }, [scanHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch {
      // Ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch {
      // Ignore
    }
  }, [language]);

  // Apply High Contrast & Large Text classes on root HTML element
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (highContrast) {
      htmlEl.classList.add('high-contrast');
    } else {
      htmlEl.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (largeText) {
      htmlEl.classList.add('large-text');
    } else {
      htmlEl.classList.remove('large-text');
    }
  }, [largeText]);

  const handleSpeak = (text: string) => {
    speakText(
      text,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleToggleSpeakPage = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const t = TRANSLATIONS[language];
    let textToRead = `${t.brandName}. ${t.heroTitle}. ${t.heroSubtitle}`;
    if (activeResultRecord) {
      textToRead = `${activeResultRecord.prediction.diseaseName}. ${t.confidenceScore}: ${activeResultRecord.prediction.confidence}%. ${activeResultRecord.prediction.recommendedActions.join(' ')}`;
    } else if (activeTab === 'dashboard') {
      textToRead = `${t.dashboardTitle}. ${t.dashboardSubtitle}`;
    } else if (activeTab === 'scan') {
      textToRead = `${t.scanPageTitle}. ${t.scanPageSubtitle}`;
    } else if (activeTab === 'weather') {
      textToRead = `${t.weatherTitle}.`;
    } else if (activeTab === 'expert') {
      textToRead = `${t.expertTitle}. ${t.kccBannerText}`;
    }

    handleSpeak(textToRead);
  };

  const handleNavigateTab = (tab: NavTab) => {
    stopSpeaking();
    setIsSpeaking(false);
    setActiveResultRecord(null);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickStartCropScan = (cropId: CropId) => {
    setSelectedCrop(cropId);
    setActiveResultRecord(null);
    setActiveTab('scan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanComplete = (newRecord: ScanRecord) => {
    setScanHistory((prev) => [newRecord, ...prev]);
    setActiveResultRecord(newRecord);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScanRecord = (record: ScanRecord) => {
    setActiveResultRecord(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteScanRecord = (id: string) => {
    setScanHistory((prev) => prev.filter((item) => item.id !== id));
    if (activeResultRecord?.id === id) {
      setActiveResultRecord(null);
    }
  };

  const handleClearAllHistory = () => {
    setScanHistory([]);
    setActiveResultRecord(null);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleAddTask = (
    title: string,
    crop: string,
    priority: 'Urgent' | 'Routine' | 'Preventive'
  ) => {
    const newTask: FarmingTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title,
      crop,
      dueTime: 'Today · Field Schedule',
      priority,
      completed: false,
      plotName: crop,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-stone-900 hc-surface pb-20 lg:pb-0">
      {/* Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        language={language}
        setLanguage={setLanguage}
        isSpeaking={isSpeaking}
        onToggleSpeakPage={handleToggleSpeakPage}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        largeText={largeText}
        setLargeText={setLargeText}
        isOffline={isOffline}
        onToggleOfflineSimulation={handleToggleOfflineSimulation}
      />

      {/* Offline-Resilient Mode Toast Notification */}
      <OfflineToast
        visible={toastVisible}
        isOffline={isOffline}
        language={language}
        onDismiss={() => setToastVisible(false)}
      />

      {/* Main Responsive Content Container (1440px baseline, generous padding) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {activeResultRecord ? (
          <DiseaseResult
            record={activeResultRecord}
            language={language}
            onBackToScanner={() => {
              setActiveResultRecord(null);
              setActiveTab('scan');
            }}
            onNavigateTab={handleNavigateTab}
            onSpeakText={handleSpeak}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <LandingPage
                language={language}
                setLanguage={setLanguage}
                setActiveTab={handleNavigateTab}
                onQuickStartCropScan={handleQuickStartCropScan}
                onSpeakText={handleSpeak}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardPage
                language={language}
                setActiveTab={handleNavigateTab}
                scanHistory={scanHistory}
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onAddTask={handleAddTask}
                onSelectScanRecord={handleSelectScanRecord}
                onSpeakText={handleSpeak}
              />
            )}

            {activeTab === 'scan' && (
              <DiseaseScanner
                language={language}
                selectedCrop={selectedCrop}
                setSelectedCrop={setSelectedCrop}
                onScanComplete={handleScanComplete}
              />
            )}

            {activeTab === 'history' && (
              <ScanHistoryPage
                language={language}
                scanHistory={scanHistory}
                onSelectRecord={handleSelectScanRecord}
                onDeleteRecord={handleDeleteScanRecord}
                onClearAllHistory={handleClearAllHistory}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {activeTab === 'weather' && (
              <WeatherAlertsPage
                language={language}
                onSpeakText={handleSpeak}
              />
            )}

            {activeTab === 'expert' && (
              <ExpertHelpPage
                language={language}
                scanHistory={scanHistory}
              />
            )}
          </>
        )}
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-stone-200 bg-stone-100/70 py-8 px-4 sm:px-6 lg:px-8 hc-surface">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-600 hc-text-muted">
          <div>
            <strong className="text-stone-900 font-semibold hc-surface">{t.brandName}</strong> — Smart Agriculture: Disease Prediction for Indian Smallholders. Built for offline-resilient rural field use.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigateTab('scan')}
              className="hover:underline cursor-pointer"
            >
              {t.navScan}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => handleNavigateTab('weather')}
              className="hover:underline cursor-pointer"
            >
              {t.navWeather}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => handleNavigateTab('expert')}
              className="hover:underline cursor-pointer"
            >
              KVK Helpline (1800-180-1551)
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Thumb-Zone Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        language={language}
      />
    </div>
  );
}
