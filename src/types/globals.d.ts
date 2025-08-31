declare global {
  interface Window {
    trackEvent: (eventName: string, parameters?: any) => void;
    trackNotificationEvent: (action: string, data?: any) => void;
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    lintrk: (...args: any[]) => void;
  }
}

export {};
