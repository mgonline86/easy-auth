"use server";

import { redirect } from "next/navigation";
import { createSession } from "./session";
import { type FormState, LoginFormSchema, SignupFormSchema } from "./type";

export async function signUp(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    password: formData.get("password") || "",
  };
  const validationFields = SignupFormSchema.safeParse(rawData);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const url = `${process.env.API_URL}/auth/signup`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (!res.ok) {
    if (res.status === 409) {
      return {
        error: {
          email: ["User already exists!"],
        },
        inputs: rawData,
      };
    }

    console.error(`Failed to sign up (code ${res.status}): ${res.statusText}`);

    return {
      inputs: rawData,
      message: "Something went wrong! Please try again.",
    };
  }

  const {
    accessToken,
    user: { id, name, email },
  } = await res.json();
  await createSession({
    user: {
      id,
      name,
      email,
    },
    accessToken,
  });
  redirect("/");
}

export async function login(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    email: formData.get("email") || "",
    password: formData.get("password") || "",
  };
  const validationFields = LoginFormSchema.safeParse(rawData);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const url = `${process.env.API_URL}/auth/signin`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (!res.ok) {
    if (res.status === 401) {
      return {
        message: "Invalid Credentials!",
        inputs: rawData,
      };
    }

    console.error(`Failed to sign up (code ${res.status}): ${res.statusText}`);

    return {
      inputs: rawData,
      message: "Something went wrong! Please try again.",
    };
  }

  const {
    accessToken,
    user: { id, name, email },
  } = await res.json();
  await createSession({
    user: {
      id,
      name,
      email,
    },
    accessToken,
  });
  redirect("/");
}
