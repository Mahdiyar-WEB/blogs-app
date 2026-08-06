import { readResetState, resetDemoData } from "./resetDemoData";

const THREE_HOURS = 3 * 60 * 60 * 1000;

let inFlightResetPromise = null;

export async function ensureDemoReset() {
  if (process.env.DEMO_MODE !== "true") {
    return { reset: false, disabled: true };
  }

  const { lastResetAt = 0 } = await readResetState();
  const now = Date.now();

  if (now - lastResetAt < THREE_HOURS) {
    return { reset: false, lastResetAt };
  }

  if (!inFlightResetPromise) {
    inFlightResetPromise = resetDemoData().finally(() => {
      inFlightResetPromise = null;
    });
  }

  const result = await inFlightResetPromise;

  return {
    reset: true,
    ...result,
  };
}
