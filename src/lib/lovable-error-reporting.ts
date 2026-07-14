type ErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // Placeholder for error tracking integration (e.g. Sentry, Datadog).
  // The error boundary in __root.tsx calls this on unhandled React errors.
  if (process.env.NODE_ENV !== "production") {
    console.error("[ErrorBoundary]", error, context);
  }
}
