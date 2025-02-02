import supabase, { supabaseUrl } from "./supabase";

export async function SignUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function apiAuth({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function apiCurrentUser() {
  let { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  let { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. update password or fullName
  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };
  let { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // 2. Upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  let { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // 3. Update avatar in user
  let { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },
    });
  if (updateError) {
    throw new Error(updateError.message);
  }
  return updatedUser;
}
