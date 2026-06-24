function scoreColor(value) {
  if (value >= 80) return "#1d9e75";
  if (value >= 60) return "#7c6ef0";
  if (value >= 40) return "#ba7517";
  return "#e07070";
}

function ScoreRing({ value, size = 64 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = scoreColor(value);

  return (
    <div className="pf-score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#13131e"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="pf-score-val" style={{ fontSize: size > 70 ? 22 : 18 }}>
        {value}
      </span>
    </div>
  );
}

export default function ScoreCard({ label, value, primary = false }) {
  const color = scoreColor(value);

  if (primary) {
    return (
      <div className="pf-score-card primary">
        <ScoreRing value={value} size={72} />
        <span className="pf-score-label">{label}</span>
      </div>
    );
  }

  return (
    <div className="pf-score-card">
      <span className="pf-score-label">{label}</span>
      <div className="pf-score-bar-wrap">
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 16,
            fontWeight: 500,
            color,
          }}
        >
          {value}
        </span>
        <div className="pf-score-bar-track">
          <div
            className="pf-score-bar-fill"
            style={{ width: `${value}%`, background: color }}
          />
        </div>
      </div>
    </div>
  );
}

export { scoreColor };
