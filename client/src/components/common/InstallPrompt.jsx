import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

const DISMISSED_KEY = 'swastik_install_dismissed';

// Listens for the browser's beforeinstallprompt event (Chrome/Edge/Android)
// and shows a small, dismissible banner offering to install the site as an
// app. Safari/iOS doesn't fire this event — those users install manually
// via "Add to Home Screen", which this banner doesn't control.
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyDismissed = localStorage.getItem(DISMISSED_KEY);
    if (alreadyDismissed) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISSED_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2.5rem)] sm:w-auto max-w-sm bg-white border border-rose-200 rounded-xl shadow-cardHover px-4 py-3.5 flex items-center gap-3 animate-toast-in">
      <span className="bg-rose-50 rounded-full p-2 shrink-0">
        <Download size={16} className="text-rose-600" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink">Install Swastik Creations</p>
        <p className="text-xs text-inkmuted">Add to your home screen for quick access</p>
      </div>
      <button
        onClick={handleInstall}
        className="bg-rose-600 hover:bg-rose-700 transition-colors text-white text-xs font-semibold px-3.5 py-2 rounded-md shrink-0"
      >
        Install
      </button>
      <button onClick={handleDismiss} aria-label="Dismiss" className="text-inkmuted hover:text-ink shrink-0">
        <X size={16} />
      </button>
    </div>
  );
}
