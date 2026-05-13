import Image from "next/image";

type BrandLogoProps = {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ inverse = false, compact = false, className = "" }: BrandLogoProps) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-3 ${className}`}>
      <span
        className={`flex shrink-0 items-center justify-center ${
          compact ? "h-11 w-16" : "h-14 w-20"
        }`}
      >
        <Image
          src="/logo-full.png"
          alt=""
          width={compact ? 44 : 56}
          height={compact ? 44 : 56}
          className="h-full w-full object-contain"
          aria-hidden="true"
          priority={compact}
        />
      </span>
      <span className="min-w-0">
        <span
          className={`block truncate text-sm font-bold tracking-normal sm:text-base ${
            inverse ? "text-white" : "text-ink-900"
          }`}
        >
          Next Young Tech
        </span>
        {!compact ? (
          <span
            className={`mt-0.5 block truncate text-xs ${
              inverse ? "text-slate-300" : "text-ink-500"
            }`}
          >
            Website • UI/UX • IT Solutions
          </span>
        ) : null}
      </span>
    </span>
  );
}
