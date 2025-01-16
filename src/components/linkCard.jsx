import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { deleteUrl } from "@/services/apiUrls";
import { BeatLoader } from "react-spinners";
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

export const LinkCard = ({ url, fetchUrls }) => {
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

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={`${url?.qr}`}
        alt={`código qr de ${url?.title}`}
        className="h-32 object-contain ring ring-blue-500 self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>

        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {`${import.meta.env.VITE_BASE_URL}/${
            url?.custom_url ? url?.custom_url : url?.short_url
          }`}
        </span>

        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>

        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

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
              {loadingDelete ? <BeatLoader size={5} color="#fff" /> : <Trash />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de que deseas eliminar esta URL?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer y perderás todas las visitas y
                datos asociados a esta URL.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => fnDelete().then(() => fetchUrls())}
              >
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

LinkCard.propTypes = {
  url: PropTypes.object.isRequired,
  fetchUrls: PropTypes.func.isRequired,
};
