import supabase, { supabaseUrl } from "@/utils/supabase";

export const getUrls = async (userId) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error.message);

    throw new Error("No se pueden cargar las URLs");
  }

  return data;
};

export const deleteUrl = async (id) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.log(error.message);

    throw new Error("Error al eliminar la URL");
  }

  return data;
};

export const createUrl = async (
  { title, longUrl, customUrl, userId },
  qrCode
) => {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${shortUrl}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrCode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        user_id: userId,
        title,
        original_url: longUrl,
        short_url: shortUrl,
        custom_url: customUrl || null,
        qr,
      },
    ])
    .select();

  if (error) {
    console.log(error.message);

    throw new Error("Error al acortar la URL");
  }

  return data;
};

export const getLongUrl = async (id) => {
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id}, custom_url.eq.${id}`)
    .single();

  if (error) {
    console.log(error.message);

    throw new Error("Fallo al obtener el enlace corto");
  }

  return data;
};

export const getUrl = async ({ id, userId }) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log(error.message);

    throw new Error("Link no encontrado");
  }

  return data;
};
