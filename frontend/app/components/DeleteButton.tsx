"use client";

import React from "react";
import { deleteBook } from "../actions";

export const DeleteButton = ({ bookId }: { bookId: number }) => {
  const handleDeleteBook = async () => {
    await deleteBook(bookId);
  };

  return (
    <button
      onClick={handleDeleteBook}
      className="bg-red-700 h-full rounded-sm py-2 px-4 text-center hover:bg-red-900"
    >
      Delete
    </button>
  );
};
