"use server";
import { auth } from "./_lib/auth";
import { revalidatePath } from "next/cache";

import { signIn as signInFunc, signOut as signOutFunc } from "./_lib/auth";
import supabase from "./_lib/supabase";

export async function signIn() {
  await signInFunc("google", { redirectTo: "/account/profile" });
}

export async function signOut() {
  await signOutFunc({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You are not authenticated");
  }
  const guestId = session?.user?.guestId;

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalId = formData.get("nationalID");

  const updatedData = { nationalId, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}
