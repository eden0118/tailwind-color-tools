import { useEffect } from 'react';

/**
 * Analytics Hook for Vercel Analytics and Web Vitals tracking
 * Tracks Core Web Vitals metrics and sends them to Vercel Analytics
 */
export const useAnalytics = () => {
  useEffect(() => {
    // Track page view
    const trackPageView = (path: string) => {
      if (typeof window !== 'undefined' && window.va) {
        window.va.track('pageview', { path });
      }
    };

    // Initial page view
    trackPageView(window.location.pathname);

    // Track route changes
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Expose tracking functions for use in components
  const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as unknown as { va?: { track: Function } }).va) {
      const va = (window as unknown as { va: { track: Function } }).va;
      va.track(eventName, data);
    }
  };

  return { trackEvent };
};

// Type augmentation for window object
declare global {
  interface Window {
    va?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}
