export function TennisBallIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M3.55 16.45A9.013 9.013 0 0 0 12 22a9.013 9.013 0 0 0 8.45-5.55" />
      <path d="M20.45 7.55A9.013 9.013 0 0 0 12 2a9.013 9.013 0 0 0-8.45 5.55" />
    </svg>
  );
}
