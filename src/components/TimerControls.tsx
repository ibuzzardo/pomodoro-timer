interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onModeChange: (mode: 'focus' | 'shortBreak' | 'longBreak') => void;
  currentMode: 'focus' | 'shortBreak' | 'longBreak';
}

export default function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onModeChange,
  currentMode,
}: TimerControlsProps): JSX.Element {
  const buttonBaseClasses = "px-4 py-2 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  const primaryButtonClasses = `${buttonBaseClasses} bg-primary text-white hover:bg-primary/90 focus:ring-primary/50`;
  const secondaryButtonClasses = `${buttonBaseClasses} bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-500/50`;
  const modeButtonClasses = `${buttonBaseClasses} text-sm px-3 py-1`;
  const activeModeClasses = "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50";
  const inactiveModeClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500/50";

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Main Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={isRunning ? onPause : onStart}
          className={primaryButtonClasses}
          aria-label={isRunning ? 'Pause timer (Space)' : 'Start timer (Space)'}
        >
          {isRunning ? (
            <>
              <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start
            </>
          )}
        </button>
        
        <button
          onClick={onReset}
          className={secondaryButtonClasses}
          aria-label="Reset timer (R)"
        >
          <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Reset
        </button>
      </div>

      {/* Mode Selection */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted mr-2">Mode:</span>
        <button
          onClick={() => onModeChange('focus')}
          className={`${modeButtonClasses} ${currentMode === 'focus' ? activeModeClasses : inactiveModeClasses}`}
          aria-label="Switch to Focus mode (1)"
        >
          Focus (1)
        </button>
        <button
          onClick={() => onModeChange('shortBreak')}
          className={`${modeButtonClasses} ${currentMode === 'shortBreak' ? activeModeClasses : inactiveModeClasses}`}
          aria-label="Switch to Short Break mode (2)"
        >
          Short Break (2)
        </button>
        <button
          onClick={() => onModeChange('longBreak')}
          className={`${modeButtonClasses} ${currentMode === 'longBreak' ? activeModeClasses : inactiveModeClasses}`}
          aria-label="Switch to Long Break mode (3)"
        >
          Long Break (3)
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-xs text-muted text-center">
        <p>Keyboard shortcuts: Space (start/pause), R (reset), 1/2/3 (modes)</p>
      </div>
    </div>
  );
}