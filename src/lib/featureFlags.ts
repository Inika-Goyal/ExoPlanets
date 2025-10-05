// Central place to read feature flags.
// Add new flags here and document expected types / behaviors.

export const featureFlags = {
  claudeSonnet4Enabled: ((): boolean => {
    const raw = import.meta.env?.VITE_CLAUDE_SONNET4_ENABLED;
    return raw === 'true' || raw === '1';
  })(),
};

export function isClaudeSonnet4Enabled() {
  return featureFlags.claudeSonnet4Enabled;
}
