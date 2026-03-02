interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  mode: string;
}

export default function TimerDisplay({ timeLeft, totalTime, mode }: TimerDisplayProps): JSX.Element {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getModeColor = (mode: string): string => {
    switch (mode) {
      case 'focus':
        return '#2563EB'; // primary
      case 'shortBreak':
        return '#10B981'; // secondary
      case 'longBreak':
        return '#F59E0B'; // accent
      default:
        return '#2563EB';
    }
  };

  const getModeLabel = (mode: string): string => {
    switch (mode) {
      case 'focus':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Timer';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold text-muted mb-2">
        {getModeLabel(mode)}
      </h2>
      
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 250 250"
        >
          {/* Background circle */}
          <circle
            cx="125"
            cy="125"
            r="120"
            stroke="#374151"
            strokeWidth="8"
            fill="transparent"
            className="opacity-20"
          />
          
          {/* Progress circle */}
          <circle
            cx="125"
            cy="125"
            r="120"
            stroke={getModeColor(mode)}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl sm:text-6xl font-bold text-foreground font-mono">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}