/**
 * Runtime app configuration.
 *
 * In Docker: entrypoint.sh generates /config.js which sets window.__APP_CONFIG__
 *            before this module loads. No values are baked into the JS bundle.
 *
 * In dev (npm run dev): window.__APP_CONFIG__ is {} (from public/config.js),
 *                       so values fall back to VITE_* env variables.
 */

interface AppConfig {
  defaultGroup: string;
  defaultStateId: number;
  defaultTags: string;
  internalEmail: string;
}

declare global {
  interface Window {
    __APP_CONFIG__?: Partial<AppConfig>;
  }
}

const runtimeCfg = window.__APP_CONFIG__ ?? {};

export const appConfig: AppConfig = {
  defaultGroup:
    runtimeCfg.defaultGroup ?? (import.meta.env.VITE_DEFAULT_GROUP || 'Support'),
  defaultStateId:
    runtimeCfg.defaultStateId ?? parseInt(import.meta.env.VITE_DEFAULT_STATE_ID || '2'),
  defaultTags:
    runtimeCfg.defaultTags ?? (import.meta.env.VITE_DEFAULT_TAGS || ''),
  internalEmail:
    runtimeCfg.internalEmail ?? (import.meta.env.VITE_INTERNAL_EMAIL || 'internal@example.com'),
};
