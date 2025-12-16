import type { BlogType } from "../types/types";
import { useEffect, useRef, useState } from "react";
import Title from "./SectionTitle";

interface BlogProps {
  data: BlogType;
}

interface Post {
  id: string;
  title: string;
  content: string;
  url: string;
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

  const formatContent = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const text = doc.body.textContent || "";
    const words = text.split(/\s+/);

    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }

    return text;
  };

  const getThumbnail = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const img = doc.querySelector("img");

    if (!img) {
      return "/images/default-thumbnail.png";
    }

    const src = img.getAttribute("src");

    if (!src) {
      return "/images/default-thumbnail.png";
    }

    return src.replace("/s20/", "/s300/");
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
    <section id={data.id} ref={blogRef} className="section blog">
      <Title id={data.id} title={data.title} />
      {data.description && <p>{data.description}</p>}
      <div id="entries" aria-live="polite">
        {posts.map((post) => (
          <article key={post.id}>
            <header>
              <h3 className="title">
                <a href={formatURL(post.url)} target="_blank">
                  {post.title}
                </a>
              </h3>
            </header>
            <p className="summary">
              <a href={formatURL(post.url)} target="_blank">
                {formatContent(post.content)}
              </a>
            </p>
            <a href={formatURL(post.url)} className="thumbnail" target="_blank">
              <img
                src={getThumbnail(post.content)}
                alt={`${data.imgAlt} ${post.title}`}
              />
            </a>
          </article>
        ))}
      </div>
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
    </section>
  );
}

export default Blog;
