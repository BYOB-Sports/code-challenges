import type { Court } from '../data/courts';
import { seedCourts } from '../data/courts';


const KEY = 'byob.tennis.v1';

export function loadCourts(): Court[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seedCourts));
      return seedCourts;
    }
    return JSON.parse(raw) as Court[];
  } catch (e) {
    console.warn('loadCourts failed, using seed', e);
    return seedCourts;
  }
}

export function saveCourts(courts: Court[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(courts));
  } catch (e) {
    console.warn('saveCourts failed', e);
  }
}
