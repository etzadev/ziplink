import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();

    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        El acortador de enlaces <br />
        que todo el mundo necesita
      </h2>

      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Escribe la URL completa aquí"
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="success">
          Acortar Link
        </Button>
      </form>

      <img src="/banner.webp" alt="Banner" className="w-full my-11 md:px-11" />

      <Accordion type="multiple" collapsible="true" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            ¿Cómo funciona el acortador de URLs ZipLink?
          </AccordionTrigger>
          <AccordionContent>
            Al ingresar una URL larga, el sistema generará automáticamente una
            versión más corta de la misma. Esta URL acortada redirigirá a la URL
            original cuando sea accedida.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            ¿Necesito una cuenta para usar la aplicación?
          </AccordionTrigger>
          <AccordionContent>
            Sí, crear una cuenta le permite administrar sus URL, ver el número
            de visitas y personalizar sus URL cortas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            ¿Qué información detallada está disponible para mis URL acortadas?
          </AccordionTrigger>
          <AccordionContent>
            Podrás ver el número de clics, datos de geolocalización de los clics
            y tipos de dispositivo (móvil/escritorio) para cada una de tus URL
            acortadas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            ¿Puedo personalizar la URL acortada?
          </AccordionTrigger>
          <AccordionContent>
            Sí, puedes personalizar la URL acortada para que sea más fácil de
            recordar y compartir.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            ¿Cómo puedo ver los análisis de mis URLs?
          </AccordionTrigger>
          <AccordionContent>
            Al crear una cuenta, tendrás acceso a un panel de análisis donde
            podrás ver el rendimiento de tus URLs acortadas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            ¿Dónde puedo encontrar mis URLs personalizadas?
          </AccordionTrigger>
          <AccordionContent>
            Todas tus URLs personalizadas estarán disponibles en el panel de
            control de tu cuenta. Desde allí, podrás gestionarlas y acceder a
            sus estadísticas.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
