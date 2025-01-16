import supabase from "@/utils/supabase";
import { UAParser } from "ua-parser-js";

export const getVisitsForUrls = async (urlsIds) => {
  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .in("url_id", urlsIds);

  if (error) {
    console.log(error.message);

    throw new Error("No se pudo obtener el registro de visitas de las URLs");
  }

  return data;
};

const parser = new UAParser();

export const storeVisits = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("visits").insert({
      url_id: id,
      country,
      city,
      device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error al registrar visita:", error.message);
  }
};

export const getVisitsForUrl = async (urlId) => {
  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .eq("url_id", urlId);

  if (error) {
    console.log(error.message);

    throw new Error("No se pueden cargar estadísticas");
  }

  return data;
};
