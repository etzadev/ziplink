import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Error } from "@/components/error";
import { useFetch } from "@/hooks/useFetch";
import { UrlState } from "@/context";
import { getUrls } from "@/services/apiUrls";
import { getVisitsForUrls } from "@/services/apiVisits";
import { LinkCard } from "@/components/linkCard";
import { CreateLink } from "@/components/createLink";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    data: urls,
    loading,
    error,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingVisits,
    data: visits,
    fn: fnVisits,
  } = useFetch(
    getVisitsForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnVisits();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingVisits) && (
        <BarLoader width={"100%"} color="#36dfbf" />
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Acortados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de accesos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{visits?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">Mis Links</h1>

        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filtrar Links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>

      {error && <Error message={error.message} />}

      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
}
