import { Injectable } from '@angular/core';

/**
 * Service for interacting with the browser's local storage.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  /**
   * Sets an item in the local storage.
   * @param key - The key of the item.
   * @param data - The data to be stored.
   */
  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Retrieves an item from the local storage.
   * @param key - The key of the item.
   * @returns The retrieved item.
   */
  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  /**
   * Removes an item from the local storage.
   * @param key - The key of the item to be removed.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all items from the local storage.
   */
  clear(): void {
    localStorage.clear();
  }
}
