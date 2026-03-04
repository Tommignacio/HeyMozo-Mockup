export default function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">02:04</span>
      <div className="status-icons">
        <svg width="17" height="12" viewBox="0 0 17 12">
          <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.4" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" opacity="0.5" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" opacity="0.8" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
          <path d="M3.5 6.5C4.9 5.1 6.4 4.4 8 4.4s3.1.7 4.5 2.1l1.4-1.4C12.1 3.3 10.1 2.4 8 2.4s-4.1.9-5.9 2.7l1.4 1.4z" />
          <path d="M0.5 3.5C2.6 1.4 5.2 0.2 8 0.2s5.4 1.2 7.5 3.3L17 2.1C14.5-.4 11.4-1.8 8-1.8S1.5-.4-1 2.1l1.5 1.4z" opacity="0" />
          <path d="M1 3.8C3 1.8 5.4.8 8 .8s5 1 7 3l1.5-1.5C14.2.6 11.3-.8 8-.8S1.8.6-.5 2.3L1 3.8z" />
        </svg>
        <span className="battery-badge">19</span>
      </div>
    </div>
  );
}
