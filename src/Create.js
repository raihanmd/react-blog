import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Raihanmd");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { token, title, author, body };

    setIsPending(true);

    fetch("https://raihanmd-blog-api.vercel.app/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("New blog added!");
        setIsPending(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">POST Token (Ask Owner for token):</label>
        <input type="text" required value={token} onChange={(e) => setToken(e.target.value)} />
        <label htmlFor="">Blog title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="">Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Raihanmd">Raihanmd</option>
        </select>
        <label htmlFor="">Blog body</label>
        <textarea cols="30" rows="10" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
      <div
        style={{
          widows: "100%",
          background: "pink",
          marginTop: "2rem",
          height: "3rem",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.3rem",
          display: error ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {error}
      </div>
    </div>
  );
};

export default Create;
