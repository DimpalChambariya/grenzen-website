import "./ProcessMotif.css";

/**
 * A schematic reading like a simplified process-flow diagram: raw material
 * tanks feeding a reactor, output flowing to storage. Grounded in what the
 * company actually does (batch processing of industrial chemicals) rather
 * than a decorative abstract shape.
 */
export default function ProcessMotif() {
  return (
    <svg viewBox="0 0 420 420" className="motif" role="img" aria-label="Process flow schematic">
      <defs>
        <linearGradient id="tankFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12968a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0e7d72" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* connecting lines */}
      <path className="motif__line" d="M70 110 H180" />
      <path className="motif__line" d="M70 210 H180" />
      <path className="motif__line" d="M70 310 H180" />
      <path className="motif__line motif__line--main" d="M220 210 H350" />

      {/* feed tanks */}
      {[110, 210, 310].map((y, i) => (
        <g key={y} className="motif__tank" style={{ animationDelay: `${i * 0.15}s` }}>
          <rect x="30" y={y - 28} width="42" height="56" rx="4" fill="url(#tankFill)" stroke="#0a1a2b" strokeWidth="1.5" />
          <rect x="30" y={y - 28} width="42" height="14" rx="4" fill="#c98a2c" />
        </g>
      ))}

      {/* reactor vessel */}
      <g className="motif__reactor">
        <circle cx="200" cy="210" r="42" fill="#0d223a" stroke="#c98a2c" strokeWidth="2" />
        <circle cx="200" cy="210" r="42" fill="none" stroke="#12968a" strokeWidth="2" className="motif__pulse" />
        <circle cx="200" cy="210" r="6" fill="#12968a" />
      </g>

      {/* output / storage */}
      <g>
        <rect x="352" y="182" width="46" height="56" rx="4" fill="#0d223a" stroke="#12968a" strokeWidth="1.5" />
        <rect x="352" y="182" width="46" height="12" rx="4" fill="#12968a" />
      </g>

      {/* flow dots along the main line */}
      <circle r="3.4" fill="#c98a2c" className="motif__flow">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M242 210 H350" />
      </circle>
    </svg>
  );
}
