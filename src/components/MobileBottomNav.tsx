import React from 'react';
import { Home, LayoutDashboard, Camera, History, CloudRain, PhoneCall } from 'lucide-react';
import { LanguageCode, NavTab } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  language: LanguageCode;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
    { id: 'dashboard', label: t.navDashboard, icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'scan', label: t.navScan, icon: <Camera className="w-5 h-5" /> },
    { id: 'history', label: t.navHistory, icon: <History className="w-5 h-5" /> },
    { id: 'weather', label: t.navWeather, icon: <CloudRain className="w-5 h-5" /> },
    { id: 'expert', label: t.navExpert, icon: <PhoneCall className="w-5 h-5" /> },
  ];

  return (
    <nav
      aria-label="Mobile Thumb Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#FBFBF9]/95 backdrop-blur-md border-t border-stone-200 hc-surface grid grid-cols-6 items-center px-1"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-colors ${
              isActive
                ? 'text-emerald-900 font-semibold bg-emerald-50/80 hc-cta'
                : 'text-stone-600 hover:text-stone-900 hc-text-muted'
            }`}
          >
            {tab.icon}
            <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[60px] whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
