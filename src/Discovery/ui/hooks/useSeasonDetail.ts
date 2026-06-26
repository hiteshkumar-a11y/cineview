import { useEffect, useState } from "react";
import axios from "axios";

import type { SeasonDetail } from "../../data/schemas/seasonSchema";
import { getSeasonDetails } from "../../data/services/tmdbService";

export function useSeasonDetail(
  tvId: number,
  seasonNumber: number
) {
  const [season, setSeason] =
    useState<SeasonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (
      !tvId ||
      Number.isNaN(tvId) ||
      !seasonNumber ||
      Number.isNaN(seasonNumber)
    ) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function loadSeason() {
      setLoading(true);
      setNotFound(false);
      setError(null);

      try {
        const data = await getSeasonDetails(
          tvId,
          seasonNumber
        );
        setSeason(data);
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response?.status === 404
        ) {
          setNotFound(true);
        } else {
          setError("Failed to load season details.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadSeason();
  }, [tvId, seasonNumber]);

  return {
    season,
    loading,
    notFound,
    error,
  };
}