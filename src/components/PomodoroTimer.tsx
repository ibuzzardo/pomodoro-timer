'use client';

import { useTimer } from '@/hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import ProgressDots from './ProgressDots';

const TIMER_DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function PomodoroTimer(): JSX.Element {
  const {
    mode,
    timeLeft,
    isRunning,
    completedPomodoros,
    totalSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
  } = useTimer();

  const totalTime = TIMER_DURATIONS[mode];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            🍅 Pomodoro Timer
          </h1>
          <p className="text-muted text-sm">
            Stay focused and productive with the Pomodoro Technique
          </p>
        </div>

        {/* Timer Display */}
        <div className="flex justify-center">
          <TimerDisplay
            timeLeft={timeLeft}
            totalTime={totalTime}
            mode={mode}
          />
        </div>

        {/* Timer Controls */}
        <TimerControls
          isRunning={isRunning}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          onModeChange={switchMode}
          currentMode={mode}
        />

        {/* Progress Dots */}
        <div className="flex justify-center">
          <ProgressDots completedPomodoros={completedPomodoros} />
        </div>

        {/* Session Counter */}
        <div className="text-center">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted mb-1">
              Today's Focus Sessions
            </h3>
            <div className="text-2xl font-bold text-foreground">
              {totalSessions}
            </div>
            <p className="text-xs text-muted mt-1">
              {totalSessions === 0 && 'Start your first session!'}
              {totalSessions === 1 && 'Great start! Keep going.'}
              {totalSessions >= 2 && totalSessions < 5 && 'You\'re on a roll!'}
              {totalSessions >= 5 && totalSessions < 10 && 'Excellent productivity!'}
              {totalSessions >= 10 && 'Amazing focus today! 🔥'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted">
          <p>
            Built with ❤️ using Next.js • 
            <a 
              href="/api/health" 
              className="text-primary hover:text-primary/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Status
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}