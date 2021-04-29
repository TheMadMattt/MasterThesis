export class Timer {
  timerName = '';
  startTime = 0;
  endTime = 0;
  totalTime = 0;
  times: number[] = [];
  averageTime = 0;

  constructor(timerName: string) {
    this.timerName = timerName;
  }

  startTimer(): void {
    this.startTime = performance.now();
  }

  stopTimer(): void {
    if (this.startTime !== 0) {
      this.endTime = performance.now();
      this.totalTime = this.endTime - this.startTime;
      this.times.push(this.totalTime);
      if (this.times.length > 2) {
        this.getAverageTime();
      }
    }
  }

  getAverageTime(): number {
    const sum = this.times.reduce((a, b) => a + b);
    this.averageTime = (sum / this.times.length);
    return this.averageTime;
  }

  clear(): void {
    this.startTime = 0;
    this.endTime = 0;
    this.totalTime = 0;
    this.times = [];
    this.averageTime = 0;
  }
}
