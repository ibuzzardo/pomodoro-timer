import type { AudioContextState } from '@/types';

class AudioManager {
  private audioState: AudioContextState = {
    context: null,
    isSupported: false
  };

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        this.audioState.context = new AudioContext();
        this.audioState.isSupported = true;
      } else if (typeof window !== 'undefined' && 'webkitAudioContext' in window) {
        // @ts-ignore - webkit prefix fallback
        this.audioState.context = new webkitAudioContext();
        this.audioState.isSupported = true;
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.audioState.isSupported = false;
    }
  }

  public async playBeep(): Promise<void> {
    try {
      if (!this.audioState.isSupported || !this.audioState.context) {
        console.warn('Audio not supported, skipping beep');
        return;
      }

      // Resume audio context if suspended (required by some browsers)
      if (this.audioState.context.state === 'suspended') {
        await this.audioState.context.resume();
      }

      const oscillator = this.audioState.context.createOscillator();
      const gainNode = this.audioState.context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioState.context.destination);

      // Configure beep sound
      oscillator.frequency.setValueAtTime(800, this.audioState.context.currentTime);
      oscillator.type = 'sine';

      // Configure volume envelope
      gainNode.gain.setValueAtTime(0, this.audioState.context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, this.audioState.context.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioState.context.currentTime + 0.5);

      // Play the beep
      oscillator.start(this.audioState.context.currentTime);
      oscillator.stop(this.audioState.context.currentTime + 0.5);
    } catch (error) {
      console.error('Failed to play beep:', error);
    }
  }

  public isSupported(): boolean {
    return this.audioState.isSupported;
  }
}

// Export singleton instance
export const audioManager = new AudioManager();

export const playBeep = (): Promise<void> => audioManager.playBeep();