export interface ImageCaptionProps {
  alt: string,
  caption: string,
  maxWidth?: string,
  url: string,
}

export function ImageCaption({ alt, caption, maxWidth = 'full', url }: ImageCaptionProps) {
  return ( 
    <figure className="max-w-lg">
      <img className={`max-w-${maxWidth} h-auto rounded-lg`} src={url} alt={alt} />
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>
    </figure>
  );
}

export default ImageCaption;
