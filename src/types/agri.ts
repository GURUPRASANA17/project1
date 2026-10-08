export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml' | 'mr' | 'bn';

export type NavTab = 'home' | 'dashboard' | 'scan' | 'history' | 'weather' | 'expert';

export type CropId = 'rice' | 'wheat' | 'tomato' | 'potato' | 'cotton' | 'sugarcane' | 'chilli' | 'groundnut';

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Healthy';

export interface DiseaseProfile {
  id: string;
  cropId: CropId;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  localNames: Partial<Record<LanguageCode, string>>;
  confidence: number;
  severity: SeverityLevel;
  affectedAreaPercent: number;
  symptoms: string[];
  recommendedActions: string[];
  organicRemedies: string[];
  chemicalControl: string[];
  preventionTips: string[];
  spreadRisk: string;
  estimatedYieldImpact: string;
}

export interface ScanRecord {
  id: string;
  timestamp: string;
  cropId: CropId;
  cropName: string;
  imageUrl: string;
  fieldPlot: string;
  prediction: DiseaseProfile;
  notes?: string;
}

export interface FarmingTask {
  id: string;
  title: string;
  crop: string;
  dueTime: string;
  priority: 'Urgent' | 'Routine' | 'Preventive';
  completed: boolean;
  plotName: string;
}

export interface WeatherAlert {
  id: string;
  district: string;
  state: string;
  title: string;
  severity: 'High' | 'Moderate' | 'Advisory';
  validUntil: string;
  description: string;
  cropImpact: string;
  actionRequired: string;
}

export interface ExpertCenter {
  id: string;
  name: string;
  role: string;
  institution: string;
  district: string;
  state: string;
  languages: string[];
  specialization: string;
  phone: string;
  availability: string;
}
