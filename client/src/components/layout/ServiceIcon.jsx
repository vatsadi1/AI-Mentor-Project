const icons = {
  map: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 5.5L8 3.5L12 5.5L17 3.5V14.5L12 16.5L8 14.5L3 16.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8 3.5V14.5M12 5.5V16.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  file: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 2.5H12L15.5 6V17.5H6V2.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M12 2.5V6H15.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 10H13M8 13H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  mic: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="7.5" y="3" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5 10.5C5 13 7.2 15 10 15C12.8 15 15 13 15 10.5M10 15V17.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  pen: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M11.5 5.5L14.5 8.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6.5 7L3.5 10L6.5 13M13.5 7L16.5 10L13.5 13M11 5L9 15"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3 16C3 13.5 4.8 12 7 12C9.2 12 11 13.5 11 16M11.5 16C11.5 14 12.8 12.5 14.5 12.5C16.2 12.5 17.5 14 17.5 16"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function ServiceIcon({ name, className = "" }) {
  return <span className={className}>{icons[name] ?? icons.map}</span>;
}
