import {
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, of, shareReplay, tap, finalize } from 'rxjs';

const cache: Map<string, HttpEvent<any>> = new Map();
const queue: Map<string, Observable<HttpEvent<any>>> = new Map();

/**
 * Interceptor to prevent duplicate HTTP requests for GET methods.
 * It checks if the request is already queued or if the response is cached.
 * If the request is queued, it returns the queued request.
 * If the response is cached, it returns the cached response.
 * Otherwise, it sends the request, caches the response, and removes the request from the queue.
 * @param req - The HTTP request.
 * @param next - The next HTTP handler.
 * @returns An observable of the HTTP event.
 */
export const preventDuplicateRequests: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const queuedRequest = queue.get(req.url);
  if (queuedRequest) {
    return queuedRequest;
  }

  const cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  const sharedRequest = next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.url, event.clone());
      }
    }),
    finalize(() => {
      queue.delete(req.url);
    }),
    shareReplay()
  );

  queue.set(req.url, sharedRequest);

  return sharedRequest;
};
