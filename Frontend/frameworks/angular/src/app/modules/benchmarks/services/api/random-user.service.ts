import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '@modules/benchmarks/models/User';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {
  private readonly RANDOM_USERS_API_URL: string = 'https://randomuser.me/api/?results=';

  constructor(private httpClient: HttpClient) { }

  getUsers(count: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.RANDOM_USERS_API_URL + `${count}`).pipe(
      map((data: any) => data.results)
    );
  }
}
