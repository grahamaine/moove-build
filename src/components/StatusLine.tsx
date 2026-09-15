import type { ActionStatus } from "@/hooks/useAsyncAction";

export function StatusLine({ status }: { status: ActionStatus }) {
  if (status.kind === "idle") return null;
  if (status.kind === "pending") {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {status.label}…
      </p>
    );
  }
  if (status.kind === "success") {
    return (
      <p className="text-sm text-emerald-600 dark:text-emerald-400">
        {status.label} ✓
      </p>
    );
  }
  return (
    <p className="text-sm text-red-600 dark:text-red-400">{status.message}</p>
  );
}
