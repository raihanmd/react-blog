import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(`https://raihanmd-blog-api.vercel.app/blog/` + id);
  const history = useHistory;

  const handleClick = () => {
    fetch("https://raihanmd-blog-api.vercel.app/blog/" + id, {
      method: "DELETE",
    }).then((res) => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <Link to="/">
            <button>&laquo; Back</button>
            <button className="delete" onClick={handleClick}>
              Delete
            </button>
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
