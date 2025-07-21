import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loading$: Observable<boolean>;
  title = 'aricim';


  constructor(private spinnerService: SpinnerService) {
    this.loading$ = this.spinnerService.isLoading$;
  }
}
