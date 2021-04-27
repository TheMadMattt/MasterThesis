export default class Timer {
  timerName = '';
  startTime = 0;
  endTime = 0;
  totalTime = 0;
  times = [];
  averageTime = 0;

  constructor(timerName) {
    this.timerName = timerName;
  }

  startTimer() {
    this.startTime = performance.now();
  }

  stopTimer() {
    if (this.startTime !== 0) {
      this.endTime = performance.now();
      this.totalTime = this.endTime - this.startTime;
      this.times.push(this.totalTime);
      if (this.times.length > 4) {
        this.getAverageTime();
      }
    }
  }

  getAverageTime() {
    if (this.times.length > 0) {
      const sum = this.times.reduce((a, b) => a + b);
      this.averageTime = (sum / this.times.length);
    }
    return this.averageTime;
  }

  clear() {
    this.startTime = 0;
    this.endTime = 0;
    this.totalTime = 0;
    this.times = [];
    this.averageTime = 0;
  }
}
