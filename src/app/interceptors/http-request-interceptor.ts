import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private _loading: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loading.setLoading(true, request.url);
        return next.handle(request)
            .pipe(
                finalize(() => {
                    this._loading.setLoading(false, request.url);
                })
            );
    }
}