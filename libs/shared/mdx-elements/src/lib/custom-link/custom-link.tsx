import Link from "next/link";

/* eslint-disable-next-line */
export interface CustomLinkProps {
  as: string,
  href: string
}

export function CustomLink({ as, href, ...otherProps }: CustomLinkProps) {
  return (
    <Link as={as} href={href} legacyBehavior>
      <a className="bg-green-800" {...otherProps} />
    </Link>
  );
}

export default CustomLink;
