export class Timer {
  startTime: number = 0;
  endTime: number = 0;
  time: number = 0;

  constructor(startNow: boolean) {
    if (startNow) {
      this.startTimer();
    }
  }

  stopTimer() {
    this.endTime = performance.now();
    this.time = this.endTime - this.startTime;
  }

  startTimer() {
    this.startTime = performance.now();
  }
}
