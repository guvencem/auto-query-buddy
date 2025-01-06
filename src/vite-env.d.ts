/// <reference types="vite/client" />

interface Window {
  aclib: {
    runAutoTag: (config: { zoneId: string }) => void;
  };
}