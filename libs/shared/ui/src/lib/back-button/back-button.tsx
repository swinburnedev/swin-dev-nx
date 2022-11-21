/* eslint-disable-next-line */
export interface BackButtonProps {
  className: string;
  href: string;
  label: string;
}

const LeftChevron = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
  </svg>
)

export function BackButton({className, href, label}: BackButtonProps) {
  return (
    <a
      href={href}
      className={`flex items-center ${ className }`}
      >
        <LeftChevron />
        <span className="self-center text-m font-semibold whitespace-nowrap">{label}</span>
    </a>
  );
}

export default BackButton;
