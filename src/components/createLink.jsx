import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Error } from "./error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import { useFetch } from "@/hooks/useFetch";
import { createUrl } from "@/services/apiUrls";
import { BeatLoader } from "react-spinners";

export const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const ref = useRef();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("El identificador es obligatorio"),
    longUrl: Yup.string()
      .url("Debe introducir una URL válida")
      .required("La url base es obligatoria"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    data,
    loading,
    error,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, userId: user.id });

  useEffect(() => {
    if (error === null && data) navigate(`/link/${data[0].id}`);
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);

    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (errors) {
      const newErrors = {};

      errors?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button variant="success">Generar link corto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl mb-3">
            Nuevo Link
          </DialogTitle>
        </DialogHeader>

        {formValues.longUrl && (
          <QRCode value={formValues.longUrl} size={200} ref={ref} />
        )}

        <div className="flex flex-col gap-4">
          <div>
            <Input
              id="title"
              placeholder="Identificador del link"
              value={formValues.title}
              onChange={handleChange}
            />
            {errors.title && <Error message={errors.title} />}
          </div>
          <div>
            <Input
              id="longUrl"
              placeholder="Url base"
              value={formValues.longUrl}
              onChange={handleChange}
            />
            {errors.longUrl && <Error message={errors.longUrl} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Card className="p-2">ziplink.app</Card> /
              <Input
                id="customUrl"
                placeholder="Link personalizado (opcional)"
                value={formValues.customUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <Error message={error.message} />}
        </div>
        <DialogFooter className="sm:justify-center">
          <Button variant="success" onClick={createNewLink} disabled={loading}>
            {loading ? <BeatLoader size={10} color="#fff" /> : "Crear link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
