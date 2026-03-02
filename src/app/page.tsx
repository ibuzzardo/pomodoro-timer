import PomodoroTimer from '@/components/PomodoroTimer';

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <PomodoroTimer />
    </div>
  );
}