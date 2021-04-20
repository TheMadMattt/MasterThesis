import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {
  numberOfBenchmarksSubject = new BehaviorSubject<number>(5);

  constructor() { }

  setNumberOfBenchmarks(count: number): void {
    this.numberOfBenchmarksSubject.next(count);
  }

  getNumberOfBenchmarks(): Observable<number> {
    return this.numberOfBenchmarksSubject.asObservable();
  }
}
