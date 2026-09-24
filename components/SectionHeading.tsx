type SectionHeadingProps = {
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionHeading({
  title,
  intro,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : "text-left"}`}
    >
      <h2
        className={`font-heading font-semibold text-3xl leading-tight md:text-4xl ${
          isDark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            isDark ? "text-white/75" : "text-muted"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
