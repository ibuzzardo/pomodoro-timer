import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerState, TimerMode, TimerConfig } from '@/types';
import { playBeep } from '@/lib/audio';

const TIMER_CONFIG: TimerConfig = {
  focus: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

const POMODOROS_BEFORE_LONG_BREAK = 4;

export function useTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    mode: 'focus',
    timeLeft: TIMER_CONFIG.focus,
    isRunning: false,
    completedPomodoros: 0,
    totalSessions: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const playNotificationSound = useCallback(async (): Promise<void> => {
    try {
      await playBeep();
    } catch (error) {
      console.error('Failed to play notification sound:', error);
    }
  }, []);

  const switchMode = useCallback((newMode: TimerMode): void => {
    try {
      setTimerState(prev => ({
        ...prev,
        mode: newMode,
        timeLeft: TIMER_CONFIG[newMode],
        isRunning: false,
      }));
      clearTimer();
    } catch (error) {
      console.error('Failed to switch mode:', error);
    }
  }, [clearTimer]);

  const getNextMode = useCallback((currentMode: TimerMode, completedPomodoros: number): TimerMode => {
    if (currentMode === 'focus') {
      return (completedPomodoros + 1) % POMODOROS_BEFORE_LONG_BREAK === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'focus';
  }, []);

  const handleTimerComplete = useCallback(async (): Promise<void> => {
    try {
      await playNotificationSound();
      
      setTimerState(prev => {
        const newCompletedPomodoros = prev.mode === 'focus' ? prev.completedPomodoros + 1 : prev.completedPomodoros;
        const newTotalSessions = prev.mode === 'focus' ? prev.totalSessions + 1 : prev.totalSessions;
        const nextMode = getNextMode(prev.mode, prev.completedPomodoros);
        
        return {
          ...prev,
          mode: nextMode,
          timeLeft: TIMER_CONFIG[nextMode],
          isRunning: false,
          completedPomodoros: newCompletedPomodoros % POMODOROS_BEFORE_LONG_BREAK,
          totalSessions: newTotalSessions,
        };
      });
      
      clearTimer();
    } catch (error) {
      console.error('Failed to handle timer completion:', error);
    }
  }, [playNotificationSound, getNextMode, clearTimer]);

  const startTimer = useCallback((): void => {
    try {
      if (intervalRef.current) return; // Prevent duplicate intervals
      
      setTimerState(prev => ({ ...prev, isRunning: true }));
      
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.timeLeft <= 1) {
            handleTimerComplete();
            return prev;
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to start timer:', error);
    }
  }, [handleTimerComplete]);

  const pauseTimer = useCallback((): void => {
    try {
      setTimerState(prev => ({ ...prev, isRunning: false }));
      clearTimer();
    } catch (error) {
      console.error('Failed to pause timer:', error);
    }
  }, [clearTimer]);

  const resetTimer = useCallback((): void => {
    try {
      setTimerState(prev => ({
        ...prev,
        timeLeft: TIMER_CONFIG[prev.mode],
        isRunning: false,
      }));
      clearTimer();
    } catch (error) {
      console.error('Failed to reset timer:', error);
    }
  }, [clearTimer]);

  const toggleTimer = useCallback((): void => {
    if (timerState.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }, [timerState.isRunning, pauseTimer, startTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      try {
        // Ignore if user is typing in an input field
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
          return;
        }

        switch (event.code) {
          case 'Space':
            event.preventDefault();
            toggleTimer();
            break;
          case 'KeyR':
            event.preventDefault();
            resetTimer();
            break;
          case 'Digit1':
            event.preventDefault();
            switchMode('focus');
            break;
          case 'Digit2':
            event.preventDefault();
            switchMode('shortBreak');
            break;
          case 'Digit3':
            event.preventDefault();
            switchMode('longBreak');
            break;
        }
      } catch (error) {
        console.error('Failed to handle keyboard shortcut:', error);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTimer, resetTimer, switchMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    ...timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    toggleTimer,
    switchMode,
  };
}