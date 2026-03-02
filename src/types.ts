export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  completedPomodoros: number;
  totalSessions: number;
}

export interface HealthResponse {
  status: string;
}

export interface TimerConfig {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

export interface AudioContextState {
  context: AudioContext | null;
  isSupported: boolean;
}