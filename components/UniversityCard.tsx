import Link from "next/link";
import { University } from "@/lib/data";

interface UniversityCardProps {
  uni: University;
  /** Extra Tailwind/CSS class names for animation or layout (e.g. observe-fade) */
  className?: string;
  /** Called when the "Fee Details" button is clicked */
  onFeeRequest?: (uniName: string) => void;
}

export default function UniversityCard({ uni, className = "", onFeeRequest }: UniversityCardProps) {
  const programs  = uni.faculties.flatMap((f) => f.programs);
  const ugCount   = programs.filter((p) => p.level === "UG").length;
  const pgCount   = programs.filter((p) => p.level === "PG").length;
  const phdCount  = programs.filter((p) => p.level === "PhD").length;
  const totalCount = programs.length;

  return (
    <div
      className={`group ${className}`}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(11,28,45,0.06), 0 4px 16px rgba(11,28,45,0.06)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 40px rgba(11,28,45,0.14), 0 2px 8px rgba(11,28,45,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(11,28,45,0.06), 0 4px 16px rgba(11,28,45,0.06)";
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden shrink-0" style={{ height: 220 }}>
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.7s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
        />

        {/* Gradient scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(11,28,45,0.18) 0%, rgba(11,28,45,0.30) 40%, rgba(11,28,45,0.82) 100%)",
          }}
        />

        {/* Top row: city pill + program count badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 100,
              padding: "0.28rem 0.7rem",
            }}
          >
            <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
              <path
                d="M4.5 0C2.01 0 0 2.01 0 4.5c0 3.375 4.5 6.5 4.5 6.5S9 7.875 9 4.5C9 2.01 6.99 0 4.5 0zm0 6.125A1.625 1.625 0 1 1 4.5 2.875a1.625 1.625 0 0 1 0 3.25z"
                fill="rgba(255,255,255,0.9)"
              />
            </svg>
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {uni.city}
            </span>
          </div>

          <div
            style={{
              background: "var(--gold)",
              borderRadius: 100,
              padding: "0.28rem 0.75rem",
              fontSize: "0.62rem",
              fontWeight: 800,
              color: "var(--navy)",
              letterSpacing: "0.04em",
            }}
          >
            {totalCount} Programs
          </div>
        </div>

        {/* Bottom: name + level pills */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h3
            className="font-display font-bold"
            style={{
              color: "#fff",
              fontSize: "1.08rem",
              lineHeight: 1.25,
              marginBottom: "0.55rem",
              textShadow: "0 1px 8px rgba(0,0,0,0.35)",
            }}
          >
            {uni.name}
          </h3>
          <div className="flex gap-1.5 flex-wrap">
            {ugCount > 0 && (
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "0.18rem 0.55rem",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                }}
              >
                UG · {ugCount}
              </span>
            )}
            {pgCount > 0 && (
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "0.18rem 0.55rem",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                }}
              >
                PG · {pgCount}
              </span>
            )}
            {phdCount > 0 && (
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "0.18rem 0.55rem",
                  borderRadius: 100,
                  background: "rgba(212,175,55,0.85)",
                  border: "none",
                  color: "var(--navy)",
                }}
              >
                PhD · {phdCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3.5">

        {/* Description */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "#6b7280",
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {uni.description}
        </p>

        {/* Faculty tags */}
        <div className="flex flex-wrap gap-1.5">
          {uni.topFaculties.slice(0, 3).map((f) => (
            <span
              key={f}
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                padding: "0.22rem 0.65rem",
                borderRadius: 100,
                background: "rgba(11,28,45,0.05)",
                color: "#374151",
                border: "1px solid rgba(11,28,45,0.08)",
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5 mt-auto pt-1">
          <Link
            href={`/programs?university=${uni.id}`}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "var(--navy)",
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 700,
              padding: "0.62rem 0.75rem",
              borderRadius: 10,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--navy-light)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--navy)";
            }}
          >
            View Programs
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            onClick={() => onFeeRequest?.(uni.name)}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "transparent",
              color: "var(--navy)",
              fontSize: "0.78rem",
              fontWeight: 700,
              padding: "0.62rem 0.75rem",
              borderRadius: 10,
              border: "1.5px solid rgba(11,28,45,0.18)",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(11,28,45,0.18)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Fee Details
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 4v2.5l1.5 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
