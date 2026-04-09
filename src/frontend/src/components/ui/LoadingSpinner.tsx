import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div
        role="status"
        aria-label={label ?? "Loading"}
        className={cn(
          "rounded-full border-border border-t-accent animate-spin",
          sizeMap[size],
        )}
      />
      {label && (
        <p className="text-body text-muted-foreground text-sm">{label}</p>
      )}
    </div>
  );
}

export function PageLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      className="flex min-h-[400px] items-center justify-center"
      data-ocid="page-loader"
    >
      <LoadingSpinner size="lg" label={label} />
    </div>
  );
}
