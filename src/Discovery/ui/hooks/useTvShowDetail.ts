import { useEffect, useState } from "react";
import axios from "axios";

import type { TvShowDetail } from "../../data/schemas/tvSchema";
import { getTvDetails } from "../../data/services/tmdbService";

export function useTvShowDetail(tvId: number) {
  const [show, setShow] =
    useState<TvShowDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!tvId || Number.isNaN(tvId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function loadShow() {
      setLoading(true);
      setNotFound(false);
      setError(null);

      try {
        const data = await getTvDetails(tvId);
        setShow(data);
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response?.status === 404
        ) {
          setNotFound(true);
        } else {
          setError("Failed to load TV show details.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadShow();
  }, [tvId]);

  return {
    show,
    loading,
    notFound,
    error,
  };
}