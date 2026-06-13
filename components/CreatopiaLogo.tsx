export default function CreatopiaLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6A2A2" />
          <stop offset="50%" stopColor="#9E3D42" />
          <stop offset="100%" stopColor="#190c0e" />
        </linearGradient>
      </defs>
      {/* Top-left C */}
      <path
        d="M8 6 Q2 6 2 12 L2 52 Q2 58 8 58 L38 58 Q44 58 44 52 L44 46 Q44 40 38 40 L18 40 Q12 40 12 34 L12 30 Q12 24 18 24 L38 24 Q44 24 44 18 L44 12 Q44 6 38 6 Z"
        fill="url(#lg1)"
        opacity="0.95"
      />
      {/* Top-right reversed C */}
      <path
        d="M132 6 Q138 6 138 12 L138 52 Q138 58 132 58 L102 58 Q96 58 96 52 L96 46 Q96 40 102 40 L122 40 Q128 40 128 34 L128 30 Q128 24 122 24 L102 24 Q96 24 96 18 L96 12 Q96 6 102 6 Z"
        fill="url(#lg1)"
        opacity="0.78"
      />
      {/* Bottom-left reversed C */}
      <path
        d="M8 82 Q2 82 2 88 L2 128 Q2 134 8 134 L38 134 Q44 134 44 128 L44 122 Q44 116 38 116 L18 116 Q12 116 12 110 L12 106 Q12 100 18 100 L38 100 Q44 100 44 94 L44 88 Q44 82 38 82 Z"
        fill="url(#lg1)"
        opacity="0.62"
      />
      {/* Bottom-right C */}
      <path
        d="M132 82 Q138 82 138 88 L138 128 Q138 134 132 134 L102 134 Q96 134 96 128 L96 122 Q96 116 102 116 L122 116 Q128 116 128 110 L128 106 Q128 100 122 100 L102 100 Q96 100 96 94 L96 88 Q96 82 102 82 Z"
        fill="url(#lg1)"
        opacity="0.45"
      />
    </svg>
  );
}