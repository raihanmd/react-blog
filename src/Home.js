import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  // const { data: blogs, isPending, error } = useFetch("https://raihanmd-blog-api.vercel.app/blog");

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://raihanmd-blog-api.vercel.app/blog", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);

  return (
    <div className="home">
      {data}
      {/* {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />} */}
    </div>
  );
};

export default Home;
