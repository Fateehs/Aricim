import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  show() {
    this._isLoading.next(true);
  }

  hide() {
    this._isLoading.next(false);
    //  this._isLoading.next(true);
  }

}
