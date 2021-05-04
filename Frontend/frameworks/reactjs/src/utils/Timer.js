export default class Timer {
  timerName = '';
  startTime = 0;
  endTime = 0;
  timesList = {};
  rowsNumber = 0;
  rowsNumberList = [];

  constructor(timerName) {
    this.timerName = timerName;
  }

  setRowsNumber = (rowsCount) => {
    this.rowsNumber = rowsCount;
    this.addRowsNumberBenchmark(rowsCount);
  }

  startTimer = () => {
    this.startTime = performance.now();
  }

  stopTimer = () =>  {
    if (this.startTime !== 0) {
      this.endTime = performance.now();
      const totalTime = this.endTime - this.startTime;
      this.timesList[this.rowsNumber].times.push(totalTime);
      this.timesList[this.rowsNumber].totalTime = totalTime;
      if (this.timesList[this.rowsNumber].times.length > 2) {
        this.getAverageTime();
      }
    }
  }

  addRowsNumberBenchmark = (rowsCount) => {
    const exist = this.rowsNumberList.find(item => item === rowsCount);
    if (!exist) {
      this.rowsNumberList.push(rowsCount);
      this.timesList[rowsCount] = { times: [], averageTime: 0, totalTime: 0};
    }
  }

  getAverageTime = () =>  {
    const times = this.timesList[this.rowsNumber].times;
    const sum = times.reduce((a, b) => a + b);
    this.timesList[this.rowsNumber].averageTime = (sum / times.length);
    return this.timesList[this.rowsNumber].averageTime;
  }

  clear = () => {
    this.startTime = 0;
    this.endTime = 0;
    this.timesList = {};
  }
}
