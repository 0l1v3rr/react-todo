import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultVale: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);

      if (saved === null) {
        return defaultVale;
      }

      return JSON.parse(saved);
    } catch {
      return defaultVale;
    }
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [value, key]
  );

  return [value, setValue] as const;
};
