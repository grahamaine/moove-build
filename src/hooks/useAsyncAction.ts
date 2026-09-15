import { useCallback, useState } from "react";

export type ActionStatus =
  | { kind: "idle" }
  | { kind: "pending"; label: string }
  | { kind: "success"; label: string }
  | { kind: "error"; message: string };

/** Wraps an async call (e.g. hitting our API routes) with pending/success/error state. */
export function useAsyncAction() {
  const [status, setStatus] = useState<ActionStatus>({ kind: "idle" });

  const run = useCallback(async <T,>(label: string, action: () => Promise<T>) => {
    setStatus({ kind: "pending", label });
    try {
      const result = await action();
      setStatus({ kind: "success", label });
      return result;
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Request failed",
      });
      return undefined;
    }
  }, []);

  const reset = useCallback(() => setStatus({ kind: "idle" }), []);
  return { status, run, reset, busy: status.kind === "pending" };
}
