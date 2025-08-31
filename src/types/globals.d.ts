declare global {
  interface Window {
    trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
    trackNotificationEvent: (action: string, data?: Record<string, unknown>) => void;
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    lintrk: (...args: unknown[]) => void;
  }
}

export {};
