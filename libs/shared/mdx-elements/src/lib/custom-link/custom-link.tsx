import Link from "next/link";

/* eslint-disable-next-line */
export interface CustomLinkProps {
  as: string,
  href: string
}

export function CustomLink({ as, href, ...otherProps }: CustomLinkProps) {
  return <Link className="bg-green-800" as={as} href={href} {...otherProps} />
}

export default CustomLink;
