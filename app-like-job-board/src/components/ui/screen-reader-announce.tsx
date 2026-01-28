/**
 * ScreenReaderAnnounce - Announces dynamic content changes to screen readers
 *
 * Uses aria-live to notify assistive technologies of content updates
 * without visual disruption to sighted users.
 */
interface ScreenReaderAnnounceProps {
  /** The message to announce to screen readers */
  message: string;
  /** Politeness level: "polite" waits for idle, "assertive" interrupts */
  politeness?: "polite" | "assertive";
}

export function ScreenReaderAnnounce({
  message,
  politeness = "polite",
}: ScreenReaderAnnounceProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
