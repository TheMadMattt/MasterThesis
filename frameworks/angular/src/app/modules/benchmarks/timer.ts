export class Timer {
  startTime: number = 0;
  endTime: number = 0;
  time: number = 0;
  times: number[] = [];
  averageTime: number = 0;

  constructor() { }

  stopTimer() {
    this.endTime = performance.now();
    this.time = this.endTime - this.startTime;
    this.times.push(this.time);
  }

  startTimer() {
    this.startTime = performance.now();
  }

  getAverageTime(): number {
    if (this.times.length > 0) {
      const sum = this.times.reduce((a, b) => a + b);
      return this.averageTime = (sum / this.times.length);
    }
    return 0;
  }
}
