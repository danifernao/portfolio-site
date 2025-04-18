import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function Blog({ data }) {
  const [posts, setPosts] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [errorFound, setErrorFound] = useState(false);
  const blogRef = useRef();

  const getEntries = (signal = null) => {
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
          setErrorFound(false);
        } else {
          setErrorFound(true);
        }
      })
      .catch((error) => {
        const mute = error;
        setErrorFound(true);
      })
      .finally(() => {
        blogRef.current.classList.remove("loading");
      });
  };

  const getMore = (event) => {
    blogRef.current.classList.add("loading");
    getEntries();
    event.preventDefault();
  };

  const formatURL = (url) => {
    return url.replace(/^(http)\:\/\//, "https://");
  };

  const formatDate = (date) => {
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
  }, [blogRef.current]);

  return (
    <div id={data.id} ref={blogRef} className="section blog loading">
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
          <p className="loading">{data.loading}</p>
          {typeof pageToken !== "undefined" && (
            <p className="more">
              <a href="#" onClick={getMore}>
                {data.more}
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}

Blog.PropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    api: PropTypes.shape({
      blogId: PropTypes.string,
      key: PropTypes.string,
      maxResults: PropTypes.number,
    }),
    more: PropTypes.string,
    loading: PropTypes.string,
    error: PropTypes.string,
  }),
};

export default Blog;
