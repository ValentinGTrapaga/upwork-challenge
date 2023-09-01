"use server";

import { revalidatePath } from "next/cache";
import { API_URL } from "./components/utils";

export const insertBook = async (formData: FormData) => {
  const title = formData.get("title");
  if (!title) return;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Title: title }),
  });
  const responseJson = await response.json();
  revalidatePath("/");
  console.log({ responseJson });
  return responseJson;
};

export const updateBook = async (id: number, status: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Status: status }),
  });
  const responseJson = await response.json();
  revalidatePath("/");
  console.log({ responseJson });
  return responseJson;
};

export const deleteBook = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const responseJson = await response.json();
  revalidatePath("/");
  console.log({ responseJson });
  return responseJson;
};
