import Link from "next/link";
import { University } from "@/lib/data";

interface UniversityCardProps {
  uni: University;
  className?: string;
  onFeeRequest?: (uniName: string) => void;
}

export default function UniversityCard({
  uni,
  className = "",
  onFeeRequest,
}: UniversityCardProps) {
  const programs = uni.faculties.flatMap((f) => f.programs);
  const ugCount = programs.filter((p) => p.level === "UG").length;
  const pgCount = programs.filter((p) => p.level === "PG").length;
  const phdCount = programs.filter((p) => p.level === "PhD").length;
  const totalCount = programs.length;

  return (
    <div
      className={`group bg-white rounded-[20px] overflow-hidden flex flex-col
      shadow-[0_1px_3px_rgba(11,28,45,0.06),0_4px_16px_rgba(11,28,45,0.06)]
      transition-all duration-300
      hover:-translate-y-1.5
      hover:shadow-[0_12px_40px_rgba(11,28,45,0.14),0_2px_8px_rgba(11,28,45,0.08)]
      ${className}`}
    >
      {/* Image Section */}
      <div className="relative h-55 overflow-hidden shrink-0">
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-[rgba(11,28,45,0.18)] via-[rgba(11,28,45,0.3)] to-[rgba(11,28,45,0.82)]" />

        {/* Top Row */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {/* City Pill */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full
            bg-white/20 backdrop-blur-md border border-white/30">
            <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
              <path
                d="M4.5 0C2.01 0 0 2.01 0 4.5c0 3.375 4.5 6.5 4.5 6.5S9 7.875 9 4.5C9 2.01 6.99 0 4.5 0zm0 6.125A1.625 1.625 0 1 1 4.5 2.875a1.625 1.625 0 0 1 0 3.25z"
                fill="rgba(255,255,255,0.9)"
              />
            </svg>
            <span className="text-[0.62rem] font-bold tracking-wider uppercase text-white">
              {uni.city}
            </span>
          </div>

          {/* Program Count */}
          <div className="px-3 py-1 rounded-full text-[0.62rem] font-extrabold tracking-wide
            bg-gold text-navy">
            {totalCount} Programs
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h3 className="font-display font-bold text-white text-[1.08rem] leading-tight mb-2 drop-shadow-md">
            {uni.name}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {ugCount > 0 && (
              <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full
                bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                UG · {ugCount}
              </span>
            )}
            {pgCount > 0 && (
              <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full
                bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                PG · {pgCount}
              </span>
            )}
            {phdCount > 0 && (
              <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full
                bg-[rgba(212,175,55,0.85)] text-navy">
                PhD · {phdCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-4">
        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {uni.description}
        </p>

        {/* Faculty Tags */}
        <div className="flex flex-wrap gap-1.5">
          {uni.topFaculties.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-[0.65rem] font-semibold px-3 py-1 rounded-full
              bg-[rgba(11,28,45,0.05)] text-gray-700 border border-[rgba(11,28,45,0.08)]"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 mt-auto pt-1">
          <Link
            href={`/programs?university=${uni.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2
            bg-navy hover:bg-navy-light
            text-white text-sm font-bold
            px-3 py-2.5 rounded-lg transition-colors duration-200"
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
            className="flex-1 inline-flex items-center justify-center gap-2
            bg-transparent text-navy text-sm font-bold
            px-3 py-2.5 rounded-lg
            border border-[rgba(11,28,45,0.18)]
            hover:border-gold
            hover:bg-[rgba(212,175,55,0.06)]
            transition-all duration-200"
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