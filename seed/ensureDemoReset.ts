import { readResetState, resetDemoData } from "./resetDemoData";

const THREE_HOURS = 3 * 60 * 60 * 1000;

type ResetDemoDataResult = Awaited<ReturnType<typeof resetDemoData>>;

let inFlightResetPromise: Promise<ResetDemoDataResult> | null = null;

type EnsureDemoResetResult =
  | { reset: false; disabled: true }
  | { reset: false; lastResetAt: number }
  | ({ reset: true } & ResetDemoDataResult);

export async function ensureDemoReset(): Promise<EnsureDemoResetResult> {
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
