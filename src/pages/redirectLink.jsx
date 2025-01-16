import { useFetch } from "@/hooks/useFetch";
import { getLongUrl } from "@/services/apiUrls";
import { storeVisits } from "@/services/apiVisits";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

export default function RedirectLink() {
  const { id } = useParams();
  const { data, loading, fn } = useFetch(getLongUrl, id);
  const { loading: loadingStats, fn: fnStats } = useFetch(storeVisits, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirigiendo...
      </>
    );
  }
}
