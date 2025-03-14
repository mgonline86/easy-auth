"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  accessToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedSecretKey = new TextEncoder().encode(secretKey);
export async function createSession(payload: Session) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecretKey);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const { payload } = await jwtVerify(sessionCookie, encodedSecretKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (err) {
    console.error("Failed to verify session:", err);
    redirect("/auth/login");
  }
}

export async function destroySession() {
  (await cookies()).delete("session");
}
