interface TitleProps {
  id: string;
  title: string;
}

function Title({ id, title }: TitleProps) {
  {
    return (
      <header>
        <h2>
          <a href={`#${id}`}>{title}</a>
        </h2>
      </header>
    );
  }
}

export default Title;
