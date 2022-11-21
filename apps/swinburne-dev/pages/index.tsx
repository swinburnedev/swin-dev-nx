import Link from 'next/link';

export function Index() {
    return (
        <div className="flex-auto max-w-4xl">
            <p className="mb-4 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">
                swinburne.dev
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
                Welcome to my site and playground
            </h1>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">
                Made with nx, next.js, Tailwind CSS and lots of other cool stuff :)
            </p>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">
                It's fast, flexible, and reliable — with zero-runtime.
            </p>
            <Link href='/projects'>
                <a className="block pt-10">Projects</a>
            </Link>
        </div>
    );
}

export default Index;
