type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.16em] ${
          inverse ? "text-cyan-electric" : "text-navy-800"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-3xl font-semibold tracking-normal sm:text-4xl ${
          inverse ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg ${
            inverse ? "text-slate-300" : "text-ink-500"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
