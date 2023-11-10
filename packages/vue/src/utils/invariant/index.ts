export function invariant(
  condition: unknown,
  message?: string
): asserts condition {
  if (condition) return;
  if (typeof message !== "string") throw new Error("Invariant failed");
  throw new Error(message);
}
