export interface ImageCaptionProps {
  alt: string,
  caption: string,
  loading?: 'eager' | 'lazy' | undefined,
  maxWidth?: string,
  priority?: string,
  url: string,
}

export function ImageCaption({ alt, caption, loading = 'eager', maxWidth = 'full', priority = 'auto', url }: ImageCaptionProps) {
  return ( 
    <figure className="max-w-lg">
      <img
        className={`max-w-${maxWidth} h-auto rounded-lg`}
        src={url}
        alt={alt}
        /* @ts-ignore */
        fetchpriority={priority}
        loading={loading}
      />
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>
    </figure>
  );
}

export default ImageCaption;
