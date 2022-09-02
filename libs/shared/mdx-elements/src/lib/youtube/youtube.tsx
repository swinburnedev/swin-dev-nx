/* eslint-disable-next-line */
export interface YoutubeProps {
  title: string,
  id: string
}

export function Youtube(props: YoutubeProps) {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${props.id}`}
        width="100%"
        height="500px"
        title={props.title}
      ></iframe>
    </div>
  );
}

export default Youtube;
