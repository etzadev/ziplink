import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { deleteUrl, getUrl } from "@/services/apiUrls";
import { BarLoader, BeatLoader } from "react-spinners";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { useNavigate, useParams } from "react-router-dom";
import { getVisitsForUrl } from "@/services/apiVisits";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Location } from "@/components/locationStats";
import { Device } from "@/components/deviceStats";

export default function Link() {
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();
  let link = "";

  const {
    data: url,
    loading,
    error,
    fn,
  } = useFetch(getUrl, { id, userId: user?.id });

  const {
    data: stats,
    loading: loadingStats,
    fn: fnStats,
  } = useFetch(getVisitsForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL}/${
        url?.custom_url ? url?.custom_url : url?.short_url
      }`
    );
  };

  const handleDownloadImage = async () => {
    if (!url?.qr || !url?.title) {
      console.error("La URL o el título están ausentes");
      return;
    }

    const imageUrl = url.qr;
    const fileName = url.title;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);
      anchor.download = fileName;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(anchor.href);
    } catch (error) {
      console.error("Error al descargar la imagen:", error);
    }
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>

          <a
            href={`${import.meta.env.VITE_BASE_URL}/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            {import.meta.env.VITE_BASE_URL}/{link}
          </a>

          <a
            href={`${url?.original_url}`}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>

          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2 items-start">
            <Button variant="ghost" onClick={handleCopy}>
              <Copy />
            </Button>
            <Button variant="ghost" onClick={handleDownloadImage}>
              <Download />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="ghost">
                  {loadingDelete ? (
                    <BeatLoader size={5} color="#fff" />
                  ) : (
                    <Trash />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de que deseas eliminar esta URL?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer y perderás todas las
                    visitas y datos asociados a esta URL.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => fnDelete()}
                  >
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <img
            src={url?.qr}
            alt={`qr ${url?.title}`}
            className="w-full self-center sm:self-start ring  ring-blue-500 p-1 object-contain"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">
              Estadísticas
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visitas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Datos de ubicación</CardTitle>
              <Location stats={stats} />

              <CardTitle>Dispositivos</CardTitle>
              <Device stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "Todavía no hay datos disponibles"
                : "Cargando datos"}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}
