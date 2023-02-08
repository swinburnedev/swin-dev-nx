export interface ProjectCardProps {
  excerpt?: string;
  title: string;
  url: string;
  imageAlt: string;
  imageUrl: string;
}

const RightArrow = () => (
  <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

export const ProjectCard = (props: ProjectCardProps) => {
  const { excerpt, title, url, imageAlt, imageUrl } = props;
  return (
    <div
      className="rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href={url}>
            <img className="rounded-t-lg" src={imageUrl} alt={imageAlt} />
        </a>
        <div className="p-5">
            <a href={url}>
                <h3 className="mb-2 text-2xl tracking-tight text-gray-700">{title}</h3>
            </a>
            <p className="mb-3 font-bold text-darkgray-800">{excerpt}</p>
            <a
              href={url}
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              aria-label={`Read more about ${title} project`}
            >
                Read more
                <RightArrow />
            </a>
        </div>
    </div>
  );
}
