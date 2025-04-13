"use server";
import { auth } from "./_lib/auth";
import { revalidatePath } from "next/cache";

import { signIn as signInFunc, signOut as signOutFunc } from "./_lib/auth";
import supabase from "./_lib/supabase";
import { da } from "date-fns/locale";

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

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You are not authenticated");
  }

  const {
    data: booking,
    error,
    count,
  } = await supabase.from("bookings").select("*").eq("id", bookingId).single();

  if (error) {
    throw new Error("Booking could not get loaded");
  }

  if (booking.guestId != session?.user?.guestId) {
    throw new Error("You are not authorzed to delete this booking!");
  }

  const { data, error: errorDelete } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (errorDelete) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = formData.get("bookingId");
  const observations = formData.get("observations");
  const numGuests = formData.get("numGuests");

  const updatedData = { observations, numGuests };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
}

export async function createBooking(initialData, formData) {
  const creationData = {
    ...initialData,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  const { error } = await supabase
    .from("bookings")
    .insert([creationData])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${creationData.cabinId}`);
}
