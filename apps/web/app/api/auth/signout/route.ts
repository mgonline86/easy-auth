import { destroySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await destroySession();

  revalidatePath("/");
  return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
}
