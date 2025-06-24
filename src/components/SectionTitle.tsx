interface TitleProps {
  id: string;
  title: string;
}

function Title({ id, title }: TitleProps) {
  {
    return (
      <h2>
        <a href={`#${id}`}>{title}</a>
      </h2>
    );
  }
}

export default Title;
