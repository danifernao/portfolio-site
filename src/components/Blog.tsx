import type { BlogType } from "../types/types";
import { useEffect, useRef, useState } from "react";
import Title from "./SectionTitle";

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
      import.meta.env.VITE_BLOGGER_BLOG_ID
    }/posts?maxResults=${data.api.maxResults}&key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }${pageToken ? "&pageToken=" + pageToken : ""}`;

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

  const getMore = () => {
    setErrorFound(false);
    setIsLoading(true);
    getEntries();
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
      <Title id={data.id} title={data.title} />
      {data.description && <p>{data.description}</p>}
      <ul id="entries" aria-live="polite">
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
              <div className="more">
                <button onClick={getMore} aria-controls="entries">
                  {data.more}
                </button>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default Blog;
