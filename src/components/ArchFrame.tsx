import type { ReactNode } from "react";

// The salon-window shape: every picture on the site sits in an arch-topped frame with a hairline of gilt.
const ArchFrame = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`overflow-hidden rounded-arch ring-1 ring-gilt/50 ${className}`}>{children}</div>
);

export default ArchFrame;
