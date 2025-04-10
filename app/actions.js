"use server";

import { signIn as signInFunc, signOut as signOutFunc } from "./_lib/auth";

export async function signIn() {
  await signInFunc("google", { redirectTo: "/account/profile" });
}

export async function signOut() {
  await signOutFunc({ redirectTo: "/" });
}
