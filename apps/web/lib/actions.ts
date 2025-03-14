"use server";

import { getSession } from "./session";

export const callProtectedRoute = async (): Promise<{ message: string }> => {
  const session = await getSession();
  const res = await fetch(`${process.env.API_URL}/auth/protected`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const result = await res.json();
  return result;
};
