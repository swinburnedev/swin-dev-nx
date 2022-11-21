export interface ImageCaptionProps {
  alt: string,
  caption: string,
  url: string,
}

export function ImageCaption({ alt, caption, url }: ImageCaptionProps) {
  return ( 
    <figure className="max-w-lg">
      <img className="max-w-full h-auto rounded-lg" src={url} alt={alt} />
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>
    </figure>
  );
}

export default ImageCaption;
