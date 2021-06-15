import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function FetchData(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      axios.get('./nyc_ttp_pins.json')
      .then(res => {
          console.log(page, res.data[page])
          setList((prev) => [...prev, res.data[page]]
          )})
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, error, list };
}

export default FetchData;