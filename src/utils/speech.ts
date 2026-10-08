import { SUPPORTED_LANGUAGES } from '../data/translations';
import { LanguageCode } from '../types/agri';

export function speakText(
  text: string,
  langCode: LanguageCode,
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  utterance.lang = langConfig ? langConfig.speechLang : 'en-IN';
  utterance.rate = 0.94; // Slightly measured pace for rural field clarity
  utterance.pitch = 1.0;

  // Attempt to pick a matching local voice if installed in browser
  const voices = window.speechSynthesis.getVoices();
  const targetPrefix = utterance.lang.split('-')[0];
  const matchedVoice =
    voices.find((v) => v.lang.toLowerCase() === utterance.lang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };
  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
