import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show();
        return next.handle(req).pipe(
            finalize(() => this.spinnerService.hide())
        );
    }
}
