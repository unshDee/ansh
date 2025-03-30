import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: WritableSignal<string> = signal<string>(localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') // Signal to hold the theme
  themeChanging: WritableSignal<boolean> = signal(false);

  constructor() {
    this.initializeTheme();
    
  }

  initializeTheme() {
    // Check the system theme using the 'prefers-color-scheme' media query
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const storedTheme = localStorage.getItem('theme');

    // Use the stored theme if available; otherwise, use the system theme
    this.theme.set(storedTheme || systemTheme);
  }

  toggleTheme() {
    this.themeChanging.set(true);
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    localStorage.setItem('theme', newTheme); // Persist the theme
    setTimeout(() => {
      this.themeChanging.set(false);
    }, 100);
  }

  setTheme(theme: string) {
    this.theme.set(theme);
    localStorage.setItem('theme', theme); // Persist the theme

    setTimeout(() => {
      this.themeChanging.set(false);
    }, 100);
  }
}
