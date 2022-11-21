import Link from 'next/link';

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const menu = [
    { name: 'CV', href: '/cv'},
    { name: 'Projects', href: '/projects'}
  ];
  
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Swindev Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Swinburne.dev</span>
      </a>
      <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-language-select">
        <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          { menu.map(item => (
            <li key={item.name}>
              <Link href={item.href} className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </nav>
  );
}
