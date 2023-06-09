import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  //? run for every render
  useEffect(() => {
    //? cleanup
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Couldn't fetch the data for that resource.`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data.payload);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== `AbortError`) {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
