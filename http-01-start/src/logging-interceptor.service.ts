import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("On way");
    return next.handle(req).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log("Response arrived, body data: ");
        console.log(event.body);
      }
    }));
  }
}