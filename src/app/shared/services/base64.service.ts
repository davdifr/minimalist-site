import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Base64Service {
  decode(base64: string): string {
    const text = atob(base64);
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      bytes[i] = text.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf8');
    return decoder.decode(bytes);
  }
}
