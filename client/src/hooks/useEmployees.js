import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

export default function useEmployees() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const res = await fetchEmployees();
        if (isMounted) {
          setData(res?.TABLE_DATA?.data || []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Failed to fetch data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
