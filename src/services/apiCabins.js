import supabase, { supabaseUrl } from "./supabase";

// read all cabins from supabase
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("there is error in loading cabins");
  }
  return data;
}

// delete  cabin from supabase
export async function deleteCabin(id) {
  console.log("Deleting Cabin with ID:", id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("there is error in deleting cabin");
  }
  return data;
}

// create / update cabin from supabase

export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  //! create / edit cabin
  let query = supabase.from("cabins");
  if (!id && !imagePath) {
    throw new Error("An image is required to create a new cabin.");
  }
  if (!imageName) {
    console.log("Cabin created/updated without a new image.");
    return data;
  }
  //! A) create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //! B) Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("there is error in creating cabin");
  }
  //! 2- Upload image
  if (hasImagePath) return data;
  const { error: ErrorStorage } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);
  //! 3. Delete the cabin IF there was an error uplaoding image
  if (ErrorStorage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(ErrorStorage);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
