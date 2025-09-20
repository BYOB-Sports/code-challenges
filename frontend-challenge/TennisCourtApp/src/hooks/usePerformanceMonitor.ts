import { useEffect, useRef, useCallback } from 'react';
import { InteractionManager } from 'react-native';

interface PerformanceMetrics {
  renderTime: number;
  interactionTime: number;
  componentName: string;
}

export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const interactionStartTime = Date.now();
    
    InteractionManager.runAfterInteractions(() => {
      const metrics: PerformanceMetrics = {
        renderTime: Date.now() - renderStartTime.current,
        interactionTime: Date.now() - interactionStartTime,
        componentName,
      };

      // Log performance metrics in development
      if (__DEV__) {
        // Performance logging for debugging
        if (metrics.renderTime > 100) {
          // Warn about slow renders
        }
        
        if (metrics.interactionTime > 500) {
          // Warn about slow interactions
        }
      }
    });
  }, [componentName]);

  const markRenderStart = useCallback(() => {
    renderStartTime.current = Date.now();
  }, []);

  const markRenderEnd = useCallback(() => {
    const renderTime = Date.now() - renderStartTime.current;
    if (__DEV__ && renderTime > 16) { // 60fps = 16.67ms per frame
      // Frame drop detection
    }
  }, [componentName]);

  return {
    markRenderStart,
    markRenderEnd,
  };
};

// Memory usage monitor
export const useMemoryMonitor = (componentName: string) => {
  const initialMemory = useRef<number | null>(null);

  useEffect(() => {
    if (__DEV__ && (global as any).performance?.memory) {
      initialMemory.current = (global as any).performance.memory.usedJSHeapSize;
      
      return () => {
        const currentMemory = (global as any).performance.memory.usedJSHeapSize;
        const memoryDiff = currentMemory - (initialMemory.current || 0);
        
        if (memoryDiff > 1024 * 1024) { // 1MB
          // Memory usage warning
        }
      };
    }
    
    return undefined;
  }, [componentName]);
};

// FPS monitor for development
export const useFPSMonitor = (enabled: boolean = __DEV__) => {
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());
  const animationFrameId = useRef<number>();

  const measureFPS = useCallback(() => {
    frameCount.current++;
    const currentTime = Date.now();
    
    if (currentTime - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      
      if (enabled && fps < 50) {
        // Low FPS warning
      }
      
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
    
    if (enabled) {
      animationFrameId.current = requestAnimationFrame(measureFPS);
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      animationFrameId.current = requestAnimationFrame(measureFPS);
      
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
    
    return undefined;
  }, [enabled, measureFPS]);
};
