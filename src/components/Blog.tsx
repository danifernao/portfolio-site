import type { BlogType } from "../types/types";
import { useEffect, useRef, useState } from "react";

interface BlogProps {
  data: BlogType;
}

interface Post {
  title: string;
  url: string;
  published: string;
}

function Blog({ data }: BlogProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageToken, setPageToken] = useState<null | string | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorFound, setErrorFound] = useState<boolean>(false);
  const blogRef = useRef<HTMLDivElement>(null);

  const getEntries = (signal: AbortSignal | null = null) => {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${
      data.api.blogId
    }/posts?maxResults=${data.api.maxResults}&key=${data.api.key}${
      pageToken ? "&pageToken=" + pageToken : ""
    }`;

    fetch(url, { signal })
      .then((response) => response.json())
      .then((json) => {
        if (json.items) {
          setPosts((p) => [...p, ...json.items]);
          setPageToken(json.nextPageToken);
        } else {
          setErrorFound(true);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setErrorFound(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getMore = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setErrorFound(false);
    setIsLoading(true);
    getEntries();
    event.preventDefault();
  };

  const formatURL = (url: string) => {
    return url.replace(/^(http)\:\/\//, "https://");
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${day}/${month}/${year.slice(-2)}`;
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (posts.length === 0) {
      getEntries(signal);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div id={data.id} ref={blogRef} className="section blog">
      <h2>
        <a href={`#${data.id}`}>{data.title}</a>
      </h2>
      {data.description && <p>{data.description}</p>}
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <time dateTime={post.published} title={post.published}>
              {formatDate(post.published)}
            </time>
            <a href={formatURL(post.url)} target="_blank">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
      {errorFound ? (
        <p className="error">{data.error}</p>
      ) : (
        <>
          {isLoading ? (
            <p className="loading">{data.loading}</p>
          ) : (
            typeof pageToken !== "undefined" && (
              <p className="more">
                <a href="#" onClick={getMore}>
                  {data.more}
                </a>
              </p>
            )
          )}
        </>
      )}
    </div>
  );
}

export default Blog;
