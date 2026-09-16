"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "moove-theme";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function setStoredTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
  listeners.forEach((l) => l());
}

/** Reads the theme set by the inline bootstrap script in the root layout, and keeps localStorage + the `dark` class in sync on toggle. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    setStoredTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return { theme, toggle };
}
