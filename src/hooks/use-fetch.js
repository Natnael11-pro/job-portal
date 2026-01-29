import { useSession } from "@clerk/clerk-react";
import { useCallback, useState } from "react";

const useFetch = (cb, options = {}) => {
  const { session } = useSession();

  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = useCallback(
    async (...args) => {
      if (!session) return;

      setLoading(true);
      setError(null);

      try {
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });

        const response = await cb(
          supabaseAccessToken,
          options,
          ...args
        );

        setData(response);
        return response;
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [cb, options, session]
  );

  return { data, loading, error, fn };
};

export default useFetch;
