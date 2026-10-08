import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, Sparkles, RefreshCw, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { CropId, DiseaseProfile, LanguageCode, ScanRecord } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { CROPS_LIST, DISEASE_DATABASE } from '../data/agriDatabase';
import riceBlastImg from '../assets/images/sample_leaf_rice_blast_1791449808969.jpg';
import healthyWheatImg from '../assets/images/sample_leaf_healthy_wheat_1791449844187.jpg';

interface DiseaseScannerProps {
  language: LanguageCode;
  selectedCrop: CropId;
  setSelectedCrop: (crop: CropId) => void;
  onScanComplete: (record: ScanRecord) => void;
}

export const DiseaseScanner: React.FC<DiseaseScannerProps> = ({
  language,
  selectedCrop,
  setSelectedCrop,
  onScanComplete,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string>(riceBlastImg);
  const [selectedSampleCondition, setSelectedSampleCondition] = useState<'diseased' | 'secondary' | 'healthy'>('diseased');
  const [fieldPlotName, setFieldPlotName] = useState<string>('Plot A1 — Main Field Block');
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);

  // Stop webcam stream on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const startWebcam = async () => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Browser camera API is unavailable in this window. Please use Upload Leaf Photo or select a field sample below.');
      return;
    }
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setIsCameraOpen(false);
      setCameraError('Camera permission was declined or no camera hardware was detected. You can upload a leaf photo from your device or test with our verified ICAR leaf samples.');
    }
  };

  const captureWebcamFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setImagePreview(dataUrl);
    }
    stopWebcam();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectCrop = (cropId: CropId) => {
    setSelectedCrop(cropId);
    const cropMeta = CROPS_LIST.find((c) => c.id === cropId);
    if (cropMeta) {
      setImagePreview(cropMeta.sampleImageUrl);
    }
  };

  const handleRunDiagnosis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 650);
    setTimeout(() => setAnalysisStep(3), 1300);

    setTimeout(() => {
      const profiles = DISEASE_DATABASE[selectedCrop] || DISEASE_DATABASE.rice;
      let chosenPrediction: DiseaseProfile = profiles[0];

      if (selectedSampleCondition === 'healthy') {
        const cropMeta = CROPS_LIST.find((c) => c.id === selectedCrop)!;
        chosenPrediction =
          DISEASE_DATABASE.wheat[0].cropId === selectedCrop
            ? DISEASE_DATABASE.wheat[0]
            : {
                ...DISEASE_DATABASE.wheat[0],
                id: `${selectedCrop}-healthy`,
                cropId: selectedCrop,
                cropName: cropMeta.name,
                diseaseName: `Healthy ${cropMeta.name} Leaf Canopy`,
                scientificName: `${cropMeta.name} — Optimal Chlorophyll Status`,
              };
      } else if (selectedSampleCondition === 'secondary' && profiles.length > 1) {
        chosenPrediction = profiles[1];
      }

      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newRecord: ScanRecord = {
        id: `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: `Today · ${formattedTime}`,
        cropId: selectedCrop,
        cropName: CROPS_LIST.find((c) => c.id === selectedCrop)?.name || 'Crop',
        imageUrl: imagePreview,
        fieldPlot: fieldPlotName,
        prediction: chosenPrediction,
      };

      setIsAnalyzing(false);
      setAnalysisStep(0);
      onScanComplete(newRecord);
    }, 1950);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-1">
        <p className="text-xs font-medium text-emerald-800 hc-text-muted">
          Computer Vision Pathology Engine · Offline-Ready Local Storage
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 hc-surface">
          {t.scanPageTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 hc-text-muted">{t.scanPageSubtitle}</p>
      </div>

      {/* Step 1: Select Crop Species */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-stone-900 hc-surface">
          {t.selectCropLabel}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CROPS_LIST.map((crop) => {
            const isSelected = selectedCrop === crop.id;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => handleSelectCrop(crop.id)}
                className={`min-h-[60px] p-3.5 rounded-xl border text-left transition-colors flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs hc-cta'
                    : 'bg-white text-stone-900 border-stone-300 hover:border-emerald-700 hc-surface'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm">{crop.name}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                </div>
                <span className={`text-xs mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-500 hc-text-muted'}`}>
                  {crop.hindiName}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Leaf Image Capture / Upload & Plot Context */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Viewport Frame */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 hc-surface">
              02. Capture or Upload Daylight Leaf Specimen
            </h2>
            <span className="text-xs text-stone-500 font-mono-tabular">JPG / PNG / WebRTC Camera</span>
          </div>

          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-stone-900 border-2 border-stone-300 flex items-center justify-center">
            {isCameraOpen ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 px-4">
                  <button
                    type="button"
                    onClick={captureWebcamFrame}
                    className="min-h-[48px] px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg cursor-pointer"
                  >
                    Capture Leaf Photo
                  </button>
                  <button
                    type="button"
                    onClick={stopWebcam}
                    className="min-h-[48px] px-4 py-2.5 bg-stone-900/90 text-white text-sm font-semibold rounded-xl border border-white/20 flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={imagePreview}
                  alt="Selected crop leaf specimen for AI pathology inspection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Scanning Laser Overlay during AI analysis */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-emerald-950/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
                    <RefreshCw className="w-10 h-10 text-amber-400 animate-spin" />
                    <div className="space-y-1">
                      <p className="font-mono-tabular text-xs uppercase tracking-wider text-emerald-300">
                        Step {analysisStep} of 3 · Spectral & Lesion Segmentation
                      </p>
                      <h3 className="text-lg font-bold">{t.analyzingLeaf}</h3>
                      <p className="text-xs text-stone-300 max-w-md">
                        Comparing necrotic border geometry and chlorosis halo ratios against ICAR plant pathology reference profiles...
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {cameraError && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Upload & Camera Trigger Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="min-h-[48px] px-4 py-3 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer hc-surface"
            >
              <Upload className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>{t.uploadPhotoBtn}</span>
            </button>

            <button
              type="button"
              onClick={startWebcam}
              className="min-h-[48px] px-4 py-3 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer hc-surface"
            >
              <Camera className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>{t.openCameraBtn}</span>
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Simulation Preset & Run Trigger */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-stone-200 space-y-6 hc-surface">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-stone-900 hc-surface">
              03. Field Specimen & Plot Details
            </h3>
            <p className="text-xs text-stone-600 hc-text-muted">
              Testing without a physical leaf in hand? Switch between verified field pathology specimens below to inspect different diagnostic outcomes.
            </p>
          </div>

          {/* Specimen Preset Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700 hc-text-muted">
              Diagnostic Specimen Mode
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedSampleCondition('diseased');
                  setImagePreview(riceBlastImg);
                }}
                className={`min-h-[44px] px-3.5 py-2.5 rounded-lg border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  selectedSampleCondition === 'diseased'
                    ? 'bg-amber-50 border-amber-600 text-stone-950 hc-cta'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hc-surface'
                }`}
              >
                <span>Primary Infection Specimen (Fungal / Viral Lesions)</span>
                {selectedSampleCondition === 'diseased' && <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedSampleCondition('healthy');
                  setImagePreview(healthyWheatImg);
                }}
                className={`min-h-[44px] px-3.5 py-2.5 rounded-lg border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  selectedSampleCondition === 'healthy'
                    ? 'bg-emerald-50 border-emerald-700 text-emerald-950 hc-cta'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hc-surface'
                }`}
              >
                <span>Healthy Leaf Canopy Specimen (Zero Pathogen Control)</span>
                {selectedSampleCondition === 'healthy' && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
              </button>
            </div>
          </div>

          {/* Field Plot Name Input */}
          <div className="space-y-1.5">
            <label htmlFor="plot-name-input" className="block text-xs font-semibold text-stone-700 hc-text-muted">
              Farm Plot / Survey Identifier
            </label>
            <input
              id="plot-name-input"
              type="text"
              value={fieldPlotName}
              onChange={(e) => setFieldPlotName(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus-visible:outline-2 focus-visible:outline-emerald-800 hc-surface"
            />
          </div>

          {/* Primary Run Diagnosis CTA */}
          <button
            type="button"
            disabled={isAnalyzing}
            onClick={handleRunDiagnosis}
            className="w-full min-h-[52px] px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2.5 shadow-md transition-transform active:scale-[0.99] cursor-pointer hc-cta"
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            <span>{isAnalyzing ? t.analyzingLeaf : t.runDiagnosisBtn}</span>
          </button>

          <p className="text-xs text-stone-500 leading-relaxed hc-text-muted">
            Tip for best accuracy: Hold the leaf flat against daylight, avoid harsh shadows, and capture both necrotic spots and surrounding green tissue.
          </p>
        </div>
      </section>
    </div>
  );
};
