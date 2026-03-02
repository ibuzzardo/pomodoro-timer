interface ProgressDotsProps {
  completedPomodoros: number;
  totalPomodoros?: number;
}

export default function ProgressDots({ 
  completedPomodoros, 
  totalPomodoros = 4 
}: ProgressDotsProps): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-3">
      <h3 className="text-sm font-medium text-muted">Pomodoro Progress</h3>
      
      <div className="flex space-x-2">
        {Array.from({ length: totalPomodoros }, (_, index) => {
          const isCompleted = index < completedPomodoros;
          
          return (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-primary border-primary shadow-lg'
                  : 'bg-transparent border-gray-600 hover:border-gray-500'
              }`}
              aria-label={`Pomodoro ${index + 1} ${isCompleted ? 'completed' : 'pending'}`}
            >
              {isCompleted && (
                <svg
                  className="w-full h-full text-white p-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-muted text-center">
        {completedPomodoros} of {totalPomodoros} completed
        {completedPomodoros === totalPomodoros && (
          <span className="block text-secondary font-medium mt-1">
            🎉 Ready for long break!
          </span>
        )}
      </div>
    </div>
  );
}