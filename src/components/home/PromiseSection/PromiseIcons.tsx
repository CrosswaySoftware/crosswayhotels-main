/** Minimal line icons — gold on dark for Our Promise rail */

export function IconComfort({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Wine glasses — clink */}
      <path
        d="M9 10 L11 22 M23 10 L21 22"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M9 10c0-2 1.5-3.5 3.5-3.5h7c2 0 3.5 1.5 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path d="M13 22h6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M16 10v-3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function IconCare({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Lotus / bloom */}
      <path
        d="M16 6 L12 14 L16 18 L20 14 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M10 14 Q16 22 22 14"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M14 18 L16 24 L18 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconValue({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.35" />
      <path d="M16 9v14M9 16h14" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M11 11l10 10M21 11L11 21" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

export function IconResponsible({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Leaf in orbit */}
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <path
        d="M16 8c-4 4-6 8-5 12 3 1 7-1 10-5 2-3 2-7-5-7z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 20c2 2 5 3 10 2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}
