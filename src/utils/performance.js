// Performance utilities for detecting device capabilities
export const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
};

export const getPerformanceLevel = () => {
    if (typeof window === 'undefined') return 'high';
    
    const mobile = isMobile();
    // @ts-ignore - deviceMemory is experimental
    const memory = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency || 2;
    
    // Low performance: mobile OR low specs
    if (mobile || (memory && memory < 4) || cores < 4) {
        return 'low';
    }
    
    // Medium performance
    if ((memory && memory < 8) || cores < 8) {
        return 'medium';
    }
    
    return 'high';
};

export const getOptimizedStarCount = () => {
    const level = getPerformanceLevel();
    return {
        low: 800,      // Mobile
        medium: 2000,  // Mid-range
        high: 4200,    // High-end
    }[level];
};

export const getOptimizedCanvasSettings = () => {
    const level = getPerformanceLevel();
    return {
        low: {
            antialias: false,
            powerPreference: 'low-power',
            pixelRatio: Math.min(window.devicePixelRatio, 1),
            shadows: false,
            toneMapping: false,
        },
        medium: {
            antialias: true,
            powerPreference: 'default',
            pixelRatio: Math.min(window.devicePixelRatio, 1.5),
            shadows: false,
            toneMapping: true,
        },
        high: {
            antialias: true,
            powerPreference: 'high-performance',
            pixelRatio: Math.min(window.devicePixelRatio, 2),
            shadows: true,
            toneMapping: true,
        },
    }[level];
};

export const shouldReduceMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
