import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const menu = [
      {name: "Projects", href: "/projects"},
      {name: "Contact", href: "/contact"},
  ]
  
  const [ navOpen, setNavOpen ] = useState(false);
  const mobileToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setNavOpen(!navOpen);
  }

  return (
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
              <a href="/" className="flex items-center">
                  <img
                      alt="Swinburne Development Ltd"
                      className="mr-3 mt-2 h-16"
                      src="/images/swin-dev-square-128.png"
                      height="64"
                      width="255"
                  />
              </a>
              <button
                  type="button"
                  className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-expanded={navOpen}
                  aria-controls="navbar-default"
                  onClick={e => mobileToggle(e)}
              >
                  <span className="sr-only">Open main menu</span>
                  <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <path
                          fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                      ></path>
                  </svg>
              </button>
              <div className={`${!navOpen ? "hidden " : ""}w-full md:block md:w-auto`} id="navbar-default">
                  <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                      {menu.map(item => (
                          <li key={item.name}>
                              <Link href={item.href} className="block py-2 pr-4 pl-3 rounded md:p-0">
                                  {item.name}
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </nav>
  )
}
