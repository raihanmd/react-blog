import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogDetails = () => {
  const { slug } = useParams();
  const { data: blog, error, isPending } = useFetch(`https://raihanmd-blog-api.vercel.app/blog/` + slug);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  let blogBody;

  const loadBlogBody = (blog) => {
    blogBody = blog.split("(next)");
  };

  const handleClick = (id) => {
    let token = prompt("Enter the Owner token:");
    if (token === "812361523712") {
      const deleteBlog = { token, id };
      setIsLoading(true);
      fetch("https://raihanmd-blog-api.vercel.app/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteBlog),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          history.push("/");
        });
    } else {
      setErr("Only owner can delete blog.");
    }
  };

  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && !isLoading && (
        <article onLoad={loadBlogBody(blog[0].body)}>
          <h2>{blog[0].title}</h2>
          <p>Written by {blog[0].author}</p>
          <div style={{ paddingTop: "1.6rem", paddingBottom: "2rem" }}>
            {blogBody.map((el, i) => (
              <p key={i} style={{ textAlign: "justify", textIndent: "45px", lineHeight: "28px" }}>
                {el}
              </p>
            ))}
          </div>
          <hr />
          <Link to="/">
            <button>&laquo; Back</button>
            <button className="delete" onClick={() => handleClick(blog[0].id)}>
              Delete
            </button>
          </Link>
          <div
            style={{
              widows: "100%",
              background: "pink",
              marginTop: "2rem",
              height: "3rem",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.3rem",
              display: err ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {err}
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
