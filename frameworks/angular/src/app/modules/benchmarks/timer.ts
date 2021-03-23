export class Timer {
  timerName = '';
  startTime = 0;
  endTime = 0;
  time = 0;
  times: number[] = [];
  averageTime = 0;

  constructor(timerName: string) {
    this.timerName = timerName;
  }

  startTimer(): void {
    this.startTime = performance.now();
  }

  stopTimer(): void {
    this.endTime = performance.now();
    this.time = this.endTime - this.startTime;
    this.times.push(this.time);
  }

  getAverageTime(): number {
    if (this.times.length > 0) {
      const sum = this.times.reduce((a, b) => a + b);
      return this.averageTime = (sum / this.times.length);
    }
    return 0;
  }
}
